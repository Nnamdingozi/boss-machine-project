 
const ideasRouter = require('express').Router();

module.exports = ideasRouter;


const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    
} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea')


ideasRouter.param('id', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id)
    if(idea) {
        req.idea = idea
        next();
    } else {
         res.status(400).send();
        };
});

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
const newIdea = addToDatabase('ideas', req.body);
res.status(201).send(newIdea);
})

ideasRouter.get('/:id', (req, res, next) => {
    res.send(req.idea)

});

ideasRouter.put('/:id', checkMillionDollarIdea,  (req, res, next) => {
    const updatedInstance = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedInstance)
});

ideasRouter.delete('/:id', (req, res, next) => {
    const deleteId = deleteFromDatabasebyId('ideas', 'id');
   if(deleteId){
    res.status(204);
   } else {
    res.status(500);
   }
    res.send();
});
