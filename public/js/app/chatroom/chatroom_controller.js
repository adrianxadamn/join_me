(function() {
  'use strict';

  angular
    .module("app")
    .controller("ChatroomController", ChatroomController);

  ChatroomController.$inject = ["$log", "chatroomService"];

  function ChatroomController($log, chatroomService) {
    $log.info("chatroom controlla is in da house");
    var vm = this;

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



  }

})();
