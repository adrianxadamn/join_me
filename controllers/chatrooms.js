var Chatroom = require("../models/chatroom");
var User     = require("../models/user");

function create(req, res, next) {
  Chatroom
    .create(req.body)
    .then(function(chatroom) {
      res.json({
        success: true,
        message: "Successfully created Chatroom.",
        data: {
          title: chatroom.title,
          thumbnail: chatroom.thumbnail,
          video: chatroom.video,
          description: chatroom.description,
          userCapacity: chatroom.userCapacity,
          id: chatroom._id
        }
      });
    }).catch(function(err) {
      if (err.message.match(/E11000/)) {
        err.status = 409;
      } else {
        err.status = 422;
      }
      next(err);
    });
};

function show(req, res, next) {

};


module.exports = {
  create: create,
  show: show
}
