// importing Timeline model
var Timeline = require('./timelineSchema');
exports.postTimeline = function(req, res) {
    var timeline = new Timeline(req.body);
    //do not allow user to fake identity. The user who postet the timeline must be the same user that is logged in
    if (!req.user.equals(timeline.user)) {
        res.sendStatus(401);
    }
    timeline.save(function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.status(201).json(m);
    });
};
// Create endpoint /api/timelines for GET
exports.getTimelines = function(req, res) {
    Timeline.find(function(err, timelines) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(timelines);
    });
};
// Create endpoint /api/timelines/:timeline_id for GET
exports.getTimeline = function(req, res) {
    // Use the Timeline model to find a specific timeline
    Timeline.findById(req.params.timeline_id, function(err, timeline) {
        if (err) {
            res.status(400).send(err)
            return;
        };

        res.json(timeline);
    });
};
// Create endpoint /api/timelines/:timeline_id for PUT
exports.putTimeline = function(req, res) {
    // Use the Timeline model to find a specific timeline and update it
    Timeline.findByIdAndUpdate(
        req.params.timeline_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, timeline) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(timeline);
    });
};
// Create endpoint /api/timelines/:timeline_id for DELETE
exports.deleteTimeline = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Timeline.findById(req.params.timeline_id, function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        m.remove();
        res.sendStatus(200);
    });
};