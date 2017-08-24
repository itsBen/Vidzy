module.exports = {
    getVideo : function(req, res){        
        console.log("getVideo");
    
        var collection = db.get('videos');
        collection.findOne({ _id: req.params.id }, function(err, video){
            if (err) throw err;
    
              res.json(video);
        });
    },
    getVideos : function(req, res){
        console.log("getVideos");
        
        var collection = db.get('videos');
        collection.find({}, function (err, videos) {
            if (err) throw err;
            res.json(videos);
        });
    },
    addVideo : function(req, res){
        console.log("addVideo");

        var collection = db.get('videos');
        collection.insert({
            title: req.body.title,
            description: req.body.description
        }, function(err, video){
            if (err) throw err;
    
            res.json(video);
        });
    },
    updatedVideo : function(req, res){
        console.log("updatedVideo");

        var collection = db.get('videos');
        collection.update({
            _id: req.params.id
        },
        {
            title: req.body.title,
            description: req.body.description
        }, function(err, video){
            if (err) throw err;
    
            res.json(video);
        });
    },
    deleteVideo : function(req, res){
        console.log("deleteVideo");

        var collection = db.get('videos');
        collection.remove({ _id: req.params.id }, function(err, video){
            if (err) throw err;
    
            res.json(video);
        });
    }
}