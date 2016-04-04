// Require resource's model(s).
var User = require("../models/user");

function create(req, res, next) {
  if (!req.body.password) {
    return res.status(422).send('Missing required fields');
  }
  User
    .create(req.body)
    .then(function(user) {
      res.json({
        success: true,
        message: 'Successfully created user.',
        data: {
          email: user.email,
          name:  user.username,
          picture: user.picture_url,
          id:    user._id
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

function update(req, res, next) {
  User
    .findById(req.decoded._id).exec()
    .then(function(user) {
      // Since empty values can be sent, we use the below code instead
      // of user.update(…); user.update() would save any empty values
      // passed in to the database!
      //
      // Also, mongoose-bcrypt sets the password as a digest only when
      // .save()-ing, not when .update()-ing! Ridiculous!
      if (req.body.email)    user.email    = req.body.email;
      if (req.body.username)     user.username     = req.body.username;
      if (req.body.password) user.password = req.body.password;

      return user.save();
    })
    .then(function(user) {
      res.json({
        success: true,
        message: 'Successfully updated user data.'
      });
    })
    .catch(function(err) {
      next(err);
    });
}

function me(req, res, next) {
  User
    .findOne({email: req.decoded.email}).exec()
    .then(function(user) {
      res.json({
        success: true,
        message: 'Successfully retrieved user data.',
        data: user
      });
    })
    .catch(function(err) {
      next(err);
    });
};

module.exports = {
  create: create,
  me: me,
  update: update
};
