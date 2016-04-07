(function() {
  'use strict';

  angular
    .module("app")
    .factory("socketService", socketService);

  socketService.$inject = [];

  function socketService() {
    var socket = io.connect('https://agile-cove-29324.herokuapp.com/');

    return socket;
  }

})();
