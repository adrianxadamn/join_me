var express  = require('express'),
    router   = new express.Router();

// Require controllers.
var usersController = require('../controllers/users');
var chatroomsController = require('../controllers/chatrooms');

var token = require('./token_auth');

router.post('/users', usersController.create);
router.get( '/users/me', token.authenticate, usersController.me);
router.put( '/users/me', token.authenticate, usersController.update);
router.post('/users/me/token', token.authenticate, token.refresh);
router.delete('/users/:id', usersController.destroy);
router.get('/users', usersController.getAll);
router.get('/users/:id', usersController.show);

router.post('/chatrooms', token.authenticate, chatroomsController.create);
router.get('/chatrooms', chatroomsController.getAll);
router.get('/chatrooms/:id', chatroomsController.show);
router.put('/chatrooms/:id', token.authenticate, chatroomsController.update);

router.post('/token',    token.create);

module.exports = router;


