/** The timeline controller receives the http requests and executes database requests.
 *
 * "req" is an object containing information about the HTTP request that raised the event.
 * In response to "req", you use "res" to send back the desired HTTP response.
 *
 * Status Codes:
 *
 * 200: OK
 * 201: Created
 *
 * 400: Bad Request
 * 401: Unauthorized
 * 404: Not found
 */
var Timeline = require('./timelineSchema');
var ObjectId = require('mongodb').ObjectID;

exports.postTimeline = function(req, res) {
    var timeline = new Timeline(req.body);
    //do not allow user to fake identity. The user who posted the timeline must be the same user that is logged in
    if (!req.user.equals(timeline.user)) {
        res.sendStatus(401);
        return;
    }
    timeline.save(function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.status(201).json(m);
    });
};

/**
 * This function looks for timelines that match the query.
 *
 * queryType can either be "user" or "public"
 * queryContent will be "_id" for a user query or every public timeline.
 * We might add a filter for public timelines later that specificies which timelines to search for.
 * (e.g. "historic", "universe")
 *
 * @param req
 * @param res
 */
exports.getTimelines = function(req, res) {

    console.log("request");
    console.log(req.params);

    if (req.params.queryType === "user") {
        Timeline.find({ "user" : ObjectId(req.params.queryContent)}, function(err, timelines) {
            if (err) {
                res.status(400).send(err);
                return;
            };
            res.json(timelines);
        });
    }
    else if (req.params.queryType === "public") {
        Timeline.find({"privacySetting": "true"}, function (err, timelines) {
            if (err) {
                res.status(400).send(err);
                return;
            };
            res.json(timelines);
        });
    }

/*
    Timeline.find(function(err, timelines) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(timelines);
    });
    */
};
// Create endpoint /api/timeline/:timeline_id for GET
exports.getTimeline = function(req, res) {
    // Use the Timeline model to find a specific timeline
    Timeline.findById(req.params.timeline_id, function(err, timeline) {
        if (err) {
            res.status(400).send(err);
            return;
        };

        res.json(timeline);
    });
};
// Create endpoint /api/timeline/:timeline_id for PUT
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
            if (!req.user.equals(timeline.user)) {
                res.sendStatus(401);
                return;
            }
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.json(timeline);
        });
};
// Create endpoint /api/timeline/:timeline_id for DELETE
exports.deleteTimeline = function(req, res) {
    // Find timeline and remove it
    Timeline.findById(req.params.timeline_id, function(err, timeline) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        if (!req.user.equals(timeline.user)) {
            res.sendStatus(401);
            return;
        }
        timeline.remove();
        res.sendStatus(200);
    });
};