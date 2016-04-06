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
      retrieve: retrieve
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
        }
      );
      return promise;
    };

    function store(data) {
      $log.info("storing data:", data);
      vm.chatroom.title = data.title
      vm.chatroom.video = data.video;
      vm.chatroom.userCapacity = data.userCapacity;
      vm.chatroom.creatorName = data.creatorName;
      vm.chatroom.description = data.description;
      vm.chatroom.users = data.users;
      $log.info(vm.chatroom);
    }

    function retrieve() {

      return vm.chatroom;
    }

  };

})();
