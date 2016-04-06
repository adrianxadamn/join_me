io = require('socket.io')();

io.on('connection', function (socket) {
  console.log('Client connected to socket.io!');

  socket.on('send message', function(data) {
    io.sockets.emit('get message', data)
  })

});



module.exports = io;
