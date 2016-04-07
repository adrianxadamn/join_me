(function() {
  'use strict';

  angular
    .module("app")
    .factory("socketService", socketService);

  socketService.$inject = [];

  function socketService() {
    var socket = io.connect('http://localhost:3000');

    return socket;
  }

})();
