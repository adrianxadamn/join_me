var Chatroom = require("../models/chatroom");
var User     = require("../models/user");

function create(req, res, next) {
  User.findById(req.decoded._id).exec()
    .then(function(user) {
      console.log(user._id);
      console.log(user.username);
      var userObject = user;
      var userId = user._id;
      var username = user.username;
      console.log("creatorName:", username)
      Chatroom
        .create({
              title: req.body.title,
              video: req.body.video,
              description: req.body.description,
              userCapacity: req.body.userCapacity,
              // creator: userObject,
              creatorName: username
            })
        .then(function(chatroom) {
          // console.log("WHAT IS userId:", userId);
          // console.log("User Object trying to push:", userObject);
          // console.log("The Chatroom:", chatroom);
          chatroom.creator = userObject;
          chatroom.users.push(userObject);
          // console.log("The Chatroom: pushed", chatroom);
          chatroom.save();
          console.log("The Chatroom: saved", chatroom);

          res.json({
            success: true,
            message: "Successfully created Chatroom.",
            data: {
              title: chatroom.title,
              video: chatroom.video,
              description: chatroom.description,
              userCapacity: chatroom.userCapacity,
              id: chatroom._id,
              creator: userObject,
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
  Chatroom.find({}).populate("users").populate("creator").exec()
    .then(function(chatrooms) {
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


function update(req, res, next) {
  var chatroomId = req.params.id;
  console.log("YOOO chatroom Id:", chatroomId);
  console.log("YOOO reqbody Id:", req.body);
  User.findById(req.decoded._id).exec()
    .then(function(user) {
      // var userId = user._id;
      console.log("CHECK THE USER:", user);
      var userObject = user;
      Chatroom.findById(chatroomId, function(err, chatroom) {
        if (err) {
          res.send(err);
        }
        chatroom.users.push(userObject);
        chatroom.save(function(err, response) {
          console.log("successfully saved!", response);
          res.json({success: "YASS"})
        })
      });
    });
};

module.exports = {
  create: create,
  getAll: getAll,
  show: show,
  update: update
}
