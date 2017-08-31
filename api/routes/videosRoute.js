const express   = require('express');
const videoCtrl = require('../controllers/videoController');
const jwt       = require('express-jwt');

var router = express.Router();

var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload',
});

//router.get('/', auth, videoCtrl.getVideos);
router.get('/', videoCtrl.getVideos);

router.post('/', videoCtrl.addVideo);
router.get('/:id', videoCtrl.getVideo);
router.put('/:id', videoCtrl.updateVideo);
router.delete('/:id', videoCtrl.deleteVideo);

module.exports = router;