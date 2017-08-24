var videoColl = require('../models/videos')

exports.getVideo = function (req, res) {
    var videoId = req.params.id;
    console.log("getVideo - id: " + videoId);

    videoColl.findOne({
        _id: videoId
    }, function (err, video) {
        if (err) throw err;

        res.json(video);
    });
};

exports.getVideos = function (req, res) {
    console.log("getVideos");

    videoColl.find({}, function (err, videos) {
        if (err) throw err;
        res.json(videos);
    });
};

exports.addVideo = function (req, res) {
    console.log("addVideo");

    videoColl.create({
        title: req.body.title,
        description: req.body.description
    }, function (err, video) {
        if (err) throw err;

        res.json(video);
    });
};

exports.updateVideo = function (req, res) {
    var videoId = req.params.id;
    console.log("updatedVideo - id: " + videoId);

    videoColl.update({
        _id: videoId
    }, {
        title: req.body.title,
        description: req.body.description
    }, function (err, video) {
        if (err) throw err;

        res.json(video);
    });
};

exports.deleteVideo = function (req, res) {
    var videoId = req.params.id;    
    console.log("deleteVideo- id: " + videoId);

    videoColl.remove({
        _id: videoId
    }, function (err, video) {
        if (err) throw err;

        res.json(video);
    });
};