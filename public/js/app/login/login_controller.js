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


    function submitLogIn() {
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
            $log.info(err);
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
