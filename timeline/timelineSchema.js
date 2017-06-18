// Load required packages
var mongoose = require('mongoose');

// Define our movie schema
var timelineSchema   = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    content: {
        eventItem: [
            {
                id: Number,
                content: String,
                start: Date,
                end: Date
            }
        ]
    }
});

var Timeline = mongoose.model('Timeline', timelineSchema);

// Export the Mongoose model
module.exports = Timeline;
