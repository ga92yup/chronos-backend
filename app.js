var Config = require('./config/config.js');
/**
 * db connect
 */
var mongoose = require('mongoose');
mongoose.connect([Config.db.host, '/', Config.db.name].join(''));

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// If the connection throws an error
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + [Config.db.host, '/', Config.db.name].join(''));
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

/**
 * create application
 */
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
/**
 * app setup
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//passport
var passport = require('passport');
var jwtConfig = require('./passport/jwtConfig');
app.use(passport.initialize());
jwtConfig(passport);
/**
 * routing
 */
var userRoutes = require("./user/userRoutes");
var timelineRoutes = require("./timeline/timelineRoutes");
app.use('/api/timeline', timelineRoutes(passport));
app.use('/api/user', userRoutes(passport));
module.exports = app;

