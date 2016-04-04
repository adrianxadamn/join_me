(function() {
  'use strict';

  angular
    .module('app')
    .config(appRoutes);

  appRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];
  function appRoutes($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "/js/app/layouts/home.html",
      })
      .state("signin", {
        url: "/signin",
        templateUrl: "/js/app/login/signin.html",
        controller: "LoginController",
        controllerAs: "vm"
      })
      // .state("chatroom", {
      //   url: "/chatroom", //this might needs it's own ID
      //   templateUrl: "/js/app/layouts/home.html",
      // })
      .state("chatroom_list", {
        url: "/chatrooms",
        templateUrl: "/js/app/chatroom/chatrooms.html",
      });

    $urlRouterProvider.otherwise("/");

  }

})();
