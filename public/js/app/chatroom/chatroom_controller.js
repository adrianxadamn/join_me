(function() {
  'use strict';

  angular
    .module("app")
    .controller("ChatroomController", ChatroomController);

  ChatroomController.$inject = ["$log", "chatroomService", "$http", "$state", "$sce", "authService", "socketService", "$scope"];

  function ChatroomController($log, chatroomService, $http, $state, $sce, authService, socket, $scope) {

    $log.info("chatroom controlla is in da house");
    var vm = this;
    vm.all = [];
    vm.authService = authService;

    vm.chatroomService = chatroomService;

    vm.submitMessage = submitMessage;

    vm.messages = [];
    vm.message = "";

    vm.movies = [];
    vm.movie = "";

    vm.videoHide = false;

    var autoplay = "?autoplay=1"

    vm.retrieveChatrooms = retrieveChatrooms;
    vm.newChatroom = newChatroom;
    vm.joinChatroom = joinChatroom;
    vm.editChatroom = editChatroom;

    vm.getYouTube = function() {
      $log.info("trying to start video");
      var src = chatroomService.retrieve().video;
      $log.info("src:", src);
      var sce = $sce.trustAsHtml('<iframe width="1000" height="500" src="https://www.youtube.com/embed/' + src + autoplay + '" frameborder="0" allowfullscreen></iframe>');
      $log.info("sce:", sce.$$unwrapTrustedValue());
      return sce;
    };


    //youtube source
    // vm.youtubeSRC = `https://www.youtube.com/embed/${vm.chatroomService.retrieve().video}`
    //youtube wireframe to be render onto single chatroom page
      //Needs $sce.trustAsHtml to let the application render <iframe> tags
    $log.info("LOOK HERE:", vm.youtubeWF);

    function submitMessage() {
      socket.emit('send message', vm.message);
      vm.message = "";
    };

    socket.on('get message', function(data) {
      console.log('get message');
      $scope.$apply(function() {
        vm.messages.push(data);
        vm.videoHide = true;
      });
    });

    vm.submitVideo = function() {
      socket.emit('send movie', vm.movie);
      vm.movie = "";
    };

    socket.on('get movie', function(data) {
      console.log('get movie');
      $scope.$apply(function() {
        vm.movies.push("yo");
        vm.videoHide = true;
      })
    })

    function editChatroom(data, chatroomId) {
      $log.info("hi")
      chatroomService.updateChatroom(data, chatroomId).then(
        function() {
          chatroomService.storeNewData(data);
        },
        function(err) {
          $log.info(err);
        })
    };


    function joinChatroom(data, userId) {
      if (data.users.length >= data.userCapacity ) {
        alert("chatroom is full");
      } else {
        $log.info("trying to enter chatroom");
        $log.info("current chatroom data trying to join:", data);
        $log.info("user id trying to join:", userId);
        $state.go('chatroom');
        getChatroomData(data, userId);
      };

    };

    function getChatroomData(data, userId) {

      var saveChatroomData = data;
      // $log.info(data, userId);
      // var chatroomId = data._id;
      // $log.info("chatroom id:", chatroomId);

      chatroomService.update(data, userId).then(
        function() {
          chatroomService.store(saveChatroomData);
        },
        function(err) {
          $log.info(err);
        })
    };

    function newChatroom(userId) {
      $log.info("trying to create chatroom");
      $log.info("current User Id:", userId);
      $log.info("current chatroom data trying to create:", vm.createChatroom);

      chatroomService
        .create(vm.createChatroom).then(
          function(response) {
            $log.info("WHAT DID I GET BACK FROM RESPONSE:", response.data.data );

            var chatroomData = response.data.data;
            $log.info("YA DID IT");
            $state.go('chatroom')
            chatroomService.store(chatroomData);

          },
          function(err) {
            $log.info(err);
          }
        );
    };

    function retrieveChatrooms() {
      $log.info("chatroom!!!", vm.chatroom)
      $http
        .get('/api/chatrooms')
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
