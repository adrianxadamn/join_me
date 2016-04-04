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

function getAll(req, res, next) {
  Chatroom.find({}, function(err, chatrooms) {
    if (err) {
      res.send(err);
    }

    res.json(chatrooms);
  });
};


module.exports = {
  create: create,
  getAll: getAll
}
