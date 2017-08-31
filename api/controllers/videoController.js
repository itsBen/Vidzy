var mongoose       = require('mongoose');
var Video          = mongoose.model('Video');
var getCurrentUser = require('../utils');

module.exports.getVideo = function (req, res) {
    var videoId = req.params.id;
    console.log("getVideo - id: " + videoId);

    Video.findOne({
        _id: videoId
    }, function (err, video) {
        if (err) throw err;

        res.json(video);
    });
};

module.exports.getVideos = function (req, res) {
    console.log("getVideos");
    // TODO:
    //getCurrentUser(req, res, function(req, res, user) {
        //console.log(user);
        Video.find({}, function (err, videos) {
            if (err) throw err;
            res.json(videos);
        });
    //});
};

module.exports.addVideo = function (req, res) {
    console.log("addVideo");

    Video.create({
        title: req.body.title,
        description: req.body.description
    }, function (err, video) {
        if (err) throw err;

        res.json(video);
    });
};

module.exports.updateVideo = function (req, res) {
    var videoId = req.params.id;
    console.log("updatedVideo - id: " + videoId);

    Video.update({
        _id: videoId
    }, {
        title: req.body.title,
        description: req.body.description
    }, function (err, video) {
        if (err) throw err;

        res.json(video);
    });
};

module.exports.deleteVideo = function (req, res) {
    var videoId = req.params.id;    
    console.log("deleteVideo- id: " + videoId);

    Video.remove({
        _id: videoId
    }, function (err, video) {
        if (err) throw err;

        res.json(video);
    });
};