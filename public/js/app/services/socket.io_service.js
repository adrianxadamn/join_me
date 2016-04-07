(function() {
  'use strict';

  angular
    .module("app")
    .factory("socketService", socketService);

  socketService.$inject = [];

  function socketService() {
    var socket = io();

    return socket;
  }

})();
