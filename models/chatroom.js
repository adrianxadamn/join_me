var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var chatroomSchema = new mongoose.Schema({
  title:            { type: String, required: true},
  creator:          {
                      type: mongoose.Schema.Types.ObjectId,
                      ref: "User"
                    },
  creatorName:      { type: String },
  video:            { type: String },
  description:      { type: String },
  userCapacity:     { type: Number },
  users:            [{
                      type: mongoose.Schema.Types.ObjectId,
                      ref: "User"
                    }],


});

var Chatroom = mongoose.model('Chatroom', chatroomSchema);

module.exports = Chatroom;
