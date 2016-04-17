io = require('socket.io')();

var users = {};

io.on('connection', function (socket) {

  socket.on('register-user', function(data) {
    console.log("YOO from the io.js. console.logging data of reg. user:", data)
    users[data.usernames] = true;
    socket.usernames = data.usernames;
    io.sockets.emit('update-user-list',
                     Object.keys(users)
    );
  });

  socket.on('disconnect', function(data) {
    console.log("removing user:", data);
    console.log("socket.usernames:", socket.usernames);

    delete users[socket.usernames];
    io.sockets.emit('update-user-list',
                     Object.keys(users)
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
