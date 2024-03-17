const meetingRouter = require('express').Router();
module.exports = meetingRouter;

const {
getAllFromDatabase,
addToDatabase,
createMeeting,
deleteAllFromDatabase

} = require('./db');

meetingRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'))

});

meetingRouter.post('/', (req, res, next) => {
    let newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
});

meetingRouter.delete('/', (req, res, next) => {
deleteAllFromDatabase('meetings');
res.status(204).send()
});
