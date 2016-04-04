(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

    LoginController.$inject = ["$log", "userService", "$state"];

  function LoginController($log, userService, $state) {
    $log.info("Login Controller is in da house");
    var vm = this;

    vm.signUp = signUp;

    function signUp() {
      $log.info("trying to create user..");
      $log.info("current user data trying to create:", vm.createUser);

      userService
        .create(vm.createUser).then(
          function() {
            $state.go("home");
          },
          function(err) {
            $log.info(err);
          }
        );
    };


  };
})();
