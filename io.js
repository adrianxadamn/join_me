io = require('socket.io')();

var users = [];

io.on('connection', function (socket) {

  socket.on('register-user', function(data) {
    console.log("YOO from the io.js. console.logging data of reg. user:", data);
    console.log('data.usernames:', data.usernames);
    //socket.id is a global variable that contains the
    //unique id of a registered user
    data.usernames.socketId = socket.id;
    users.push(data.usernames);
    socket.usernames = data.usernames;
    console.log("socket.usernames:", socket.usernames);
    console.log("users:", users);
    io.sockets.emit('update-user-list',
                     users
    );
  });

  socket.on('remove-user', function(data) {
    console.log("removing user:", data);
    console.log("socket.usernames:", socket.usernames);

    // if (users.length >= 1) {
    //   for (var i = 0; i < users.length; i++) {
    //     if (socket.usernames.name === users[i].name) {
    //       users.splice(i, 1);
    //       console.log("users left:", users);
    //       // delete users[socket.usernames];
    //       io.sockets.emit('update-user-list',
    //                        users
    //       );
    //     }
    //   }
    // }

    if (users.length >= 1) {
      for (var i = 0; i < users.length; i++) {
        if (data.usernames.name === users[i].name) {
          users.splice(i, 1);
          console.log("users left:", users);
          // delete users[socket.usernames];
          io.sockets.emit('update-user-list',
                           users
          );
        }
      }
    }

  });

  socket.on('kick-user', function(data) {
    console.log("user that will be kicked:", data);
    console.log("users:", users);
    if (users.length >= 1) {
      for (var i = 0; i < users.length; i++) {
        if (data.name === users[i].name) {
          users.splice(i, 1);
          // io.sockets.connected[data.socketId].disconnect();
          console.log("users left:", users);
          // delete users[socket.usernames];
          io.sockets.emit('update-user-list',
                           users
          );
          io.sockets.emit('get kicked user', data);
        }
      }
    }


    // io.sockets.emit('get kicked user', data);
  })

  console.log('Client connected to socket.io!');
  // console.log("clients connected:", clients);

  socket.on('send message', function(data) {
    console.log("received message:", data);
    io.sockets.emit('get message', data);
  })

  socket.on('send movie', function(data) {
    io.sockets.emit('get movie', data);
  })

});



module.exports = io;
