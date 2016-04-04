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
      thumbnail: "",
      description: "",
      userCapacity: ""
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
      $log.info(vm.chatroom);
    }

    function retrieve() {
      $log.info("THISSSS:",vm.chatroom.title);
      var title = vm.chatroom.title;
      $log.info("title:", title)
      return title;
    }

  };

})();
