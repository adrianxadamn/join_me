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
        templateUrl: "/js/app/layouts/home.html"
      })
      .state("signin", {
        url: "/signin",
        templateUrl: "/js/app/login/signin.html",
        controller: "LoginController",
        controllerAs: "vm"
      })
      .state("chatroom", {
        url: "/chatroom",
        templateUrl: "/js/app/chatroom/singlechatroom.html",
        controller: "ChatroomController",
        controllerAs: "vm"
      })
      .state("chatroom_list", {
        url: "/chatrooms",
        templateUrl: "/js/app/chatroom/chatrooms.html",
        controller: "ChatroomController",
        controllerAs: "vm"
      })
      .state("profile", {
        url: "/profile",
        templateUrl: "/js/app/profile/profile.html",
        controller: "ProfileController",
        controllerAs: "vm"
      })
      .state("newChatroom", {
        url: "/newChatroom",
        templateUrl: "/js/app/chatroom/new_chatroom.html",
        controller: "ChatroomController",
        controllerAs: "vm"
      });


    $urlRouterProvider.otherwise("/");

  }


  angular
    .module("app")
    .run(authorizeRoutes); // Register the following function to run
                           // AFTER the above configuration.

  // $state and authService you know. $rootScope is different. It's
  // the shared "scoping" object which is inherited by all bindings
  // ($scope or vm) anywhere in the app. If you add something to
  // $rootScope, it's like adding it to EVERY "vm" (view-model, ie
  // template-controller binding), directive, filter, etc. in the app.
  authorizeRoutes.$inject = ["$state", "authService", "$rootScope"];

  function authorizeRoutes($state, authService, $rootScope) {

    // $on is the Angular event listener: we are telling Angular to
    // listen to any $stateChangeStart events triggered in our app!
    $rootScope.$on("$stateChangeStart", function(event, toState) {

      // Check the new state's "authorized" property, which is not built
      // in to ui-router, it just happens to match the property I added
      // to the state definition on line #25 above!
      if (toState.authorized && !authService.isLoggedIn()) {
        $state.go("signin");    // Go here immediately, and
        event.preventDefault(); // do not let the event continue.
      }
    });
  }

})();
