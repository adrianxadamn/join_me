var Chatroom = require("../models/chatroom");
var User     = require("../models/user");

function create(req, res, next) {
  User.findById(req.decoded._id).exec()
    .then(function(user) {
      console.log(user._id);
      console.log(user.username);
      var userId = user._id;
      var username = user.username;
      console.log("creatorName:", username)
      Chatroom
        .create({
              title: req.body.title,
              video: req.body.video,
              description: req.body.description,
              userCapacity: req.body.userCapacity,
              creator: userId,
              creatorName: username
            })
        .then(function(chatroom) {
          console.log("WHAT IS userId:", userId)
          res.json({
            success: true,
            message: "Successfully created Chatroom.",
            data: {
              title: chatroom.title,
              video: chatroom.video,
              description: chatroom.description,
              userCapacity: chatroom.userCapacity,
              id: chatroom._id,
              creator: userId,
              creatorName: username
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
    })
  }
// };

function getAll(req, res, next) {
  Chatroom.find({}, function(err, chatrooms) {
    if (err) {
      res.send(err);
    }

    res.json(chatrooms);
  });
};

function show(req, res, next) {
  var id = req.params.id;

  Chatroom.findById(id, function(err, chatroom) {
    if (err) {
      res.send(err);
    }
    res.json(chatroom);
  });
};


module.exports = {
  create: create,
  getAll: getAll,
  show: show
}
