(function() {
  'use strict';

  angular
    .module("app")
    .controller("ChatroomController", ChatroomController);

  ChatroomController.$inject = ["$log", "chatroomService", "$http"];

  function ChatroomController($log, chatroomService, $http) {
    $log.info("chatroom controlla is in da house");
    var vm = this;
    vm.all = [];

    vm.retrieveChatrooms = retrieveChatrooms;
    vm.newChatroom = newChatroom;



    function newChatroom() {
      $log.info("trying to create chatroom");
      $log.info("current chatroom data trying to create:", vm.createChatroom);

      chatroomService
        .create(vm.createChatroom).then(
          function() {
            $log.info("YA DID IT")
          },
          function(err) {
            $log.info(err);
          }
        );
    };

    function retrieveChatrooms() {
      $http
        .get('http://localhost:3000/api/chatrooms')
        .then(function(res) {
          $log.info("list of chatrooms", res);
          vm.all = res.data;
          $log.info(vm.all);
        }, function(err) {
          $log.info(err);
        });
    }
    retrieveChatrooms();




  }

})();
