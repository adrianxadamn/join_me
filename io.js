io = require('socket.io')();

var users = {};

io.on('connection', function (socket) {

  socket.on('register-user', function(data) {
    users[data.usernames] = true;
    socket.usernames = data.usernames;
    io.sockets.emit('update-user-list',
                     Object.keys(users)
    );
  });

  socket.on('disconnect', function(data) {
    delete users[socket.usernames];
    io.sockets.emit('update-user-list',
                     Object.keys(users)
    );
  });

  console.log('Client connected to socket.io!');

  socket.on('send message', function(data) {
    io.sockets.emit('get message', data)
  })

  socket.on('send movie', function(data) {
    io.sockets.emit('get movie', data)
  })

});



module.exports = io;
