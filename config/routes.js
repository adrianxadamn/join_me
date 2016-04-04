var express = require('express'),
    router  = new express.Router();

// Require controllers.
var usersController = require('../controllers/users');

router.post('/users', usersController.create);

module.exports = router;
