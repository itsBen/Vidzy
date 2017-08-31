const express        = require('express');
const mongoose       = require('mongoose');
const jwt            = require('express-jwt');
const getCurrentUser = require('../utils');

var router           = express.Router();
const User           = mongoose.model('User');

var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload',
});

router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    if (err) throw err;
    res.json(users);
  });
});

router.get('/me', auth, (req, res, callback) => {
  getCurrentUser(req, res, function(req, res, user) {
    res.json(user);
  });
});

module.exports = router;