var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var userSchema = new mongoose.Schema({
  username:   String,
  email:  String,
  picture_url : String

});

userSchema.plugin(require('mongoose-bcrypt'));

var User = mongoose.model('User', userSchema);

module.exports = User;
