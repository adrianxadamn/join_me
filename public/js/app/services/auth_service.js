(function() {
  'use strict';

  angular
    .module("app")
    .factory("authService", authService);

  authService.$inject = ["$log", "tokenService", "$http"];

  function authService($log, tokenService, $http) {
    $log.info("auth service is in da house")

    var service = {
      logIn: logIn,
      isLoggedIn: isLoggedIn,
      logout: logout,
      currentUser: currentUser,
      refreshToken: refreshToken
    }

    return service;

    function refreshToken() {
      var promise = $http({
        method: 'POST',
        url:    '/api/users/me/token'
      })
      .then(function(res) {
        token.store(res.data.token);
        return token.decode();
      });

      return promise;
    }

    function currentUser() {
      var tokenData = tokenService.decode();
       if (tokenData) {
        // No real reason to do this, just showing you
        // how it can be done. We can clean out (remove)
        // properties from the token that are about the token
        // itself, not the user; this cleans up the data.
        tokenData.expiresAt = Date(tokenData.exp);
        delete tokenData.exp;
        delete tokenData.iat;
      }
       // $log.info("Current user retrieved:", tokenData);
       return tokenData;
    }


    function logout() {
      tokenService.destroy();
    }

    function isLoggedIn() {
      $log.info(tokenService.retrieve() != null);
      return (tokenService.retrieve() != null);
    }

    function logIn(data) {

      var promise = $http({
        method: 'POST',
        url: '/api/token',
        data: data
      })
      .then(
        function(res) {
          $log.info("success:", res);
          // $log.info("your token is: ", res.data.token);
          tokenService.store(res.data.token);
          // $log.info("Success:", tokenService.decode());
          // tokenService.destroy();
          return tokenService.decode();
        },
        function(err) {
          $log.info(err);
        }
      );
      return promise;


    };


  }



})();
