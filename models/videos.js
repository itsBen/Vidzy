//Require Mongoose
var mongoose = require( 'mongoose' );

//Define a schema
var videoSchema = new mongoose.Schema({
    _Id: Schema.Types.ObjectId,    
    updated: { type: Date, default: Date.now },    
    title: {type: String, required: true},
    description: String,
    genre: String,
    rating: {type: Number, "default": 0, min: 0, max: 5}
 });

 // Compile model from schema
 //var videos = mongoose.model('Video', videoSchema, 'videos')

 //Export function to create "Video" model class
module.exports = mongoose.model('Video', videoSchema );