const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if(minion) {
        req.minion = minion;
        next()
    } else {
        res.status(404).send();
    }
});

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'))
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion)
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion)
});

minionsRouter.put('/:minionId', (req, res, next) => {
    let updatedMinions = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinions)
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleteMinion = deleteFromDatabasebyId('minions', req.params.minionId);
if(deleteMinion) {
    res.status(204);
} else { res.status(500)}
res.send();
});

minionsRouter.get('/:minionId/work', (req, res, next) => {
const works = getAllFromDatabase('work').filter(work => {
  return  work.minionId === req.params.minionId;
})
res.status(201).send(works);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
const newWork = req.body;
newWork.minionId = req.params.minionId;
const createdWork = addToDatabase('work', newWork);
res.status(201).send(createdWork)
});

minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if(work){
        req.work = work;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if(req.params.minionId !== req.body.minionId) {
        res.status(404).send();
    }else {
      const updatedWork = updateInstanceInDatabase('work', req.params.workId);
    }
    res.send(updatedWork);
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    let deletedWork = deleteFromDatabasebyId('work', req.params.workId);
if(deletedWork) {
    res.status(204)
} else {
    res.status(500)
}
res.send()
});



