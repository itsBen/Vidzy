var express = require('express');
//var videoCtrl = require('../controllers/videoController');

var router = express.Router();

/*
var monk = require('monk');
var db = monk('localhost:27017/vidzy');
*/

var videoColl = require('../models/videos')

router.get('/', function(req, res) {
    console.log("getAllVideos");

    videoColl.find({}, function (err, videos) {
        if (err) throw err;
        res.json(videos);
    });
});

router.post('/', function(req, res){
    videoColl.create({
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating,
        genre: req.body.genre
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

router.get('/:id', function(req, res) {
    videoColl.findOne({ _id: req.params.id }, function(err, video){
        if (err) throw err;

      	res.json(video);
    });
});

router.put('/:id', function(req, res){
    videoColl.update({
        _id: req.params.id
    },
    {
        title: req.body.title,
        description: req.body.description
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

router.delete('/:id', function(req, res){
    videoColl.remove({ _id: req.params.id }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});


/*

router.route('/').get(videoCtrl.getVideos);
router.route('/').post(videoCtrl.addVideo);
router.route('/:id').get(videoCtrl.getVideo);
router.route('/:id').put(videoCtrl.updateVideo);
router.route('/:id').delete(videoCtrl.deleteVideo);
*/

module.exports = router;