(function() {
  'use strict';

  angular
    .module("app")
    .controller("NavbarController", NavbarController);

  NavbarController.$inject = ["$log", "authService", "chatroomService"];

  function NavbarController($log, authService, chatroomService) {
    $log.info("navbar controller is in da house");
    var vm = this;

    vm.authService = authService;
    vm.chatroomService = chatroomService;
  };



})();
