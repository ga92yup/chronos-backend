module.exports = timelineRoutes;


function timelineRoutes(passport) {

    var timelineController = require('./timelineController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/')
        .post(timelineController.postTimeline)
        .get(timelineController.getTimelines);

    router.route('/:timeline_id')
        .get(timelineController.getTimeline)
        .put(timelineController.putTimeline)
        .delete(timelineController.deleteTimeline);

    return router;
}
