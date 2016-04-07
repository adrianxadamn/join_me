(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

    LoginController.$inject = ["$log", "userService", "$state", "$http", "authService"];

  function LoginController($log, userService, $state, $http, authService) {
    $log.info("Login Controller is in da house");
    var vm = this;

    vm.signUp = signUp;
    vm.submitLogIn = submitLogIn;
    vm.toggleSignInForm = toggleSignInForm;
    vm.toggleValue = true;

    vm.conflict = false;
    vm.conflict2 = false;
    vm.conflict3 = false;

    function submitLogIn() {
      if (vm.currentLogInInfo === undefined ) {
        vm.conflict3 = true;
      } else {
        $log.info("Loggin in:", vm.currentLogInInfo);

        authService
          .logIn(vm.currentLogInInfo)
          .then(
            function(decodedToken) {
              $state.go("home");
            },
            function(err) {
              $log.info("err:", err);
            }
          );

      }
    };

    //creates a new User into the database
    function signUp() {
      $log.info("trying to create user..");
      $log.info("current user data trying to create:", vm.createUser);

      userService
        .create(vm.createUser).then(
          function() {
            $state.go("home");
          },
          function(err) {
            if (err.status === 409) {
              vm.conflict = true;
              $log.info(err);
            } else if (err.status == 422 || err.status === 400) {
              vm.conflict2 = true;
              $log.info(err);
            }
          }
        );
    };

    //Toggles Sign in Form
    function toggleSignInForm() {
      $log.info("sup");
      vm.toggleValue =  !vm.toggleValue;
    }

  };
})();
