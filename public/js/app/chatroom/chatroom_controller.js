(function() {
  'use strict';

  angular
    .module("app")
    .controller("ChatroomController", ChatroomController);

  ChatroomController.$inject = ["$log", "chatroomService", "$http", "$state", "$sce"];

  function ChatroomController($log, chatroomService, $http, $state, $sce) {
    $log.info("chatroom controlla is in da house");
    var vm = this;
    vm.all = [];



    vm.chatroomService = chatroomService;

    vm.retrieveChatrooms = retrieveChatrooms;
    vm.newChatroom = newChatroom;
    vm.joinChatroom = joinChatroom;

    //youtube source
    vm.youtubeSRC = `https://www.youtube.com/embed/${vm.chatroomService.retrieve().video}`
    //youtube wireframe to be render onto single chatroom page
      //Needs $sce.trustAsHtml to let the application render <iframe> tags
    vm.youtubeWF = $sce.trustAsHtml(`<iframe width="1000" height="500" src=${vm.youtubeSRC} frameborder="0" allowfullscreen></iframe>`);
    $log.info("LOOK HERE:", vm.youtubeWF);

    function joinChatroom(data) {
      $log.info("trying to enter chatroom");
      $log.info("current chatroom data trying to join:", data);

      $state.go('chatroom');
      getChatroomData(data);
    };

    function getChatroomData(data) {
      $log.info(data);

      $http
        .get('http://localhost:3000/api/chatrooms/' + data)
        .then(function(res) {
          $log.info("chatroom data:", res);
          chatroomService.store(res.data);
          // vm.chatroom = res.data;
          // $log.info("vm.chatroom title:", res.data.title);
          // vm.chatroom.title = res.data.title;
          // $log.info(vm.chatroom);
        }, function(err) {
          $log.info(err);
        });
    };

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
      $log.info("chatroom!!!", vm.chatroom)
      $http
        .get('http://localhost:3000/api/chatrooms')
        .then(function(res) {
          $log.info("list of chatrooms", res);
          vm.all = res.data;
          $log.info("vm.all", vm.all);
        }, function(err) {
          $log.info(err);
        });
    }
    retrieveChatrooms();




  }

})();
