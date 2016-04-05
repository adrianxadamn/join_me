var mongoose = require('./database');

var User = require('../models/user');
var Chatroom = require('../models/chatroom');

// User
//   .remove({})
//   .then(function() {
//     console.log('All users removed…');

//     return mongoose.connection.close();
//   })
//   .then(function() {
//     process.exit(0);
//   });
Chatroom
  .remove({})
  .then(function() {
    console.log('All chatrooms removed…');

    return mongoose.connection.close();
  })
  .then(function() {
    process.exit(0);
  });
