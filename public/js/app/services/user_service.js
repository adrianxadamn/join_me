(function() {
  'use strict';

  angular
    .module("app")
    .factory("userService", userService);

  userService.$inject = ["$log", "$http", "authService", "tokenService"];

  function userService($log, $http, authService, tokenService) {
    $log.info("user service is in da house");

    var service = {
      create: create,
      update: update
    };

    return service;

    function create(data) {
      var promise = $http({
        method: 'POST',
        url: '/api/users',
        data: data
      })
      .then(
        function(res) {
          $log.info("checkme", data)
          authService.logIn(data);
        }
      );

      return promise;
    };

    function update(data) {
      var promise = $http({
        method: 'PUT',
        url:    '/api/users/me',
        data:   data
      });

      return promise;
    }




  };

})();
