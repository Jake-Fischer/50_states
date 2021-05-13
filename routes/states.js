//Here are our routes, or things out server can do

let express = require('express')
let States = require('../models').States

let router = express.Router()

//Gets all of the states
router.get('/states', function(req, res, next) {
    States.findAll({ order: ['name']}).then( states => {
        return res.json(states)
    })
    .catch (err => next(err))
})

//Get information about a specific state
router.get('/state/:name', function(req, res, name) {
    let stateName = req.params.name
    States.findOne( {where: { name : stateName}})
        .then( state => {
            if (state) {
                return res.json(state)
            } else {
                return res.status(404).send('State not found')
            }
        })
        .catch( err => next(err) )
})

//Patch route, to update a state
router.patch('/states/:name', function(req, res, next){
    let stateName = req.params.name
    let stateVisited = req.body.visited

    States.update( { visited: stateVisited}, { where: {name: stateName}}) //Find the state in the state list and change it's visited property
        .then( rowsUpdated => {
            let numberOfRowsUpdated = rowsUpdated[0]
            if (numberOfRowsUpdated == 1) {
                return res.send('ok') //Send a message that confirms the row was updated
            }
            return res.status(404).send('State not found') //If a row isn't updated, the state doesn't exist in our database
        })
        .catch( err => next(err) ) //Other server error handling
})

module.exports = router