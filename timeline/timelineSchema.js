// Load required packages
var mongoose = require('mongoose');

// Define our movie schema
var Timeline   = new mongoose.Schema({
    title: String,
    description: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Timeline', Timeline);

