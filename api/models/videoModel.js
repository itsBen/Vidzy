var mongoose = require( 'mongoose' );

//Define a schema
var Schema = mongoose.Schema;

var videoSchema = new Schema({
    //_Id: Schema.Types.ObjectId,    
    updated: { type: Date, default: Date.now },    
    title: {type: String, required: true},
    description: String,
    genre: String,
    uploader: String,
    rating: {type: Number, "default": 0, min: 0, max: 5}
 });

 //Export function to create "Video" model class
module.exports = mongoose.model('Video', videoSchema );