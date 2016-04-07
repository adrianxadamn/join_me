(function() {
  'use strict';

  angular
    .module("app")
    .factory("chatroomService", chatroomService);

  chatroomService.$inject = ["$log", "$http"]

  function chatroomService($log, $http) {
    $log.info("chatroom service is in da house");
    var vm = this;
    vm.chatroom = {
      title: "",
      video: "",
      description: "",
      userCapacity: "",
      creatorName: ""
    };

    var service = {
      create: create,
      store: store,
      retrieve: retrieve,
      update: update,
      storeNewData: storeNewData,
      updateChatroom: updateChatroom
    };

    return service;

    function create(data) {
      $log.info("chatroom data:", data);

      var promise = $http({
        method: 'POST',
        url: '/api/chatrooms',
        data: data
      })
      .then(
        function(res) {
          $log.info("successssss");
          return res;
        }
      );
      // $log.info("promise data:", promise.data);
      return promise;
    };

    function store(data) {
      $log.info("storing data:", data);
      vm.chatroom.title = data.title;
      vm.chatroom.video = data.video;
      vm.chatroom.userCapacity = data.userCapacity;
      vm.chatroom.creatorName = data.creatorName;
      vm.chatroom.description = data.description;
      vm.chatroom.users = data.users;
      vm.chatroom._id = data._id;
      $log.info(vm.chatroom);
    }

    function storeNewData(data) {
      vm.chatroom.title = data.title;
      vm.chatroom.video = data.video;
      vm.chatroom.userCapacity = data.userCapacity;
      vm.chatroom.description = data.description;
    }

    function update(data, userId) {
      var promise = $http({
        method: 'PATCH',
        url: '/api/chatrooms/' + data._id,
        data: { id:userId },
        headers: {
          // 'Authorization': 'Bearer ' + token.retrieve(),
          'Content-Type':  'application/json'
        }
      });
      return promise;
    };

    function updateChatroom(data, chatroomId) {
      var promise = $http({
        method: "PUT",
        url: '/api/chatrooms/' + chatroomId,
        data: data,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return promise;
    };

    function retrieve() {

      return vm.chatroom;
    }

  };

})();
