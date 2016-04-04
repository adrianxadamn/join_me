(function() {
  'use strict';

  angular
    .module("app")
    .factory("chatroomService", chatroomService);

  chatroomService.$inject = ["$log", "$http"]

  function chatroomService($log, $http) {
    $log.info("chatroom service is in da house");

    var service = {
      create: create
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

  };

})();
