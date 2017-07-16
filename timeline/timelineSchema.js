// Load required packages
var mongoose = require('mongoose');

// Define our movie schema
var timelineSchema   = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    created_at: {
        type: Date,
        required: true
    },
    privacySetting: {
        type: Boolean,
        default: false //false = private
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    uname: String,

    content: {
        eventItem: [
            {
                id: Number,
                content: String,
                start: Date,
                end: Date
            }
        ]
    },
    views : {
        type: Number,
        default: 1
    }
});

var Timeline = mongoose.model('Timeline', timelineSchema);

// Export the Mongoose model
module.exports = Timeline;
