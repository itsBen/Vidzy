//Import the mongoose module
var mongoose = require('mongoose');

var readLine = require ("readline");

//Set up default mongoose connection
var dbURI = 'mongodb://localhost/vidzy';
mongoose.connect(dbURI);

//Get the default connection
var db = mongoose.connection;

var gracefulShutdown;

db.on('connected', function(){
    console.log('Mongoose connected to ' + dbURI);
})

db.on('error', function(err){
    console.log('Mongoose connection error: ' + err);
})

db.on('disconnected', function(){
    console.log('Mongoose disconnected');
})

/*
vidzyDB.close(function(){
    console.log('Mongoose log disconnected');
})
*/

if (process.platform === "win32"){
    var rl = readLine.createInterface ({
        input: process.stdin,
        output: process.stdout
    });

    rl.on ("SIGINT", function (){
        process.emit ("SIGINT");
    });
}

gracefulShutdown = function(msg, callback){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

// for nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// for app termination
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

// for heruko app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});


require('./videos');