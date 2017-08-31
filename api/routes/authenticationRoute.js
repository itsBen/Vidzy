/*
const express = require('express');
const router  = express.Router();

var authCtrl   = require('../controllers/authenticationController');

router.post('/register', authCtrl.register );
router.post('/login', authCtrl.login );

module.exports = router;
*/

var express = require('express');
var router = express.Router();
var passport = require('passport');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

router.post('/login', function(req, res) {
  if (!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      message: 'All fields required',
    });
    return;
  }
  passport.authenticate('local', function(err, user, info) {
    var token;
    if (err) {
      sendJSONresponse(res, 404, err);
      return;
    }
    if (user) {
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        token: token,
      });
    } else {
      sendJSONresponse(res, 401, info);
    }
  })(req, res);
});

router.post('/register', (req, res) => {
  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
  });
  newUser.setPassword(req.body.password);

  newUser.save(function(err) {
    var token;
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      token = newUser.generateJwt();
      sendJSONresponse(res, 200, {
        token: token,
      });
    }
  });
});

module.exports = router;
