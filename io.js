io = require('socket.io')();

var users = [];

io.on('connection', function (socket) {

  socket.on('register-user', function(data) {
    console.log("YOO from the io.js. console.logging data of reg. user:", data);
    console.log('data.usernames:', data.usernames);
    users.push(data.usernames);
    socket.usernames = data.usernames;
    console.log("socket.usernames:", socket.usernames);
    console.log("users:", users);
    io.sockets.emit('update-user-list',
                     users
    );
  });

  socket.on('disconnect', function(data) {
    console.log("removing user:", data);
    console.log("socket.usernames:", socket.usernames);

    if (users.length >= 1) {
      for (var i = 0; i < users.length; i++) {
        if (socket.usernames.name === users[i].name) {
          users.splice(i, 1);
        }
      }
    }

    // delete users[socket.usernames];
    io.sockets.emit('update-user-list',
                     users
    );
  });

  console.log('Client connected to socket.io!');

  socket.on('send message', function(data) {
    console.log("received message:", data)
    io.sockets.emit('get message', data)
  })

  socket.on('send movie', function(data) {
    io.sockets.emit('get movie', data)
  })

});



module.exports = io;
