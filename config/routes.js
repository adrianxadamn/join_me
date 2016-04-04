var express  = require('express'),
    router   = new express.Router();

// Require controllers.
var usersController = require('../controllers/users');

var token = require('./token_auth');

router.post('/users', usersController.create);
router.get( '/users/me', token.authenticate, usersController.me);

router.post('/token',    token.create);

module.exports = router;



