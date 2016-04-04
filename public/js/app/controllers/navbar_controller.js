(function() {
  'use strict';

  angular
    .module("app")
    .controller("NavbarController", NavbarController);

  NavbarController.$inject = ["$log", "authService"];

  function NavbarController($log, authService) {
    $log.info("navbar controller is in da house");
    var vm = this;

    vm.authService = authService;
  };



})();
