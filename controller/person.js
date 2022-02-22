const personRouter = require('express').Router()
const Person = require('../models/person')
const logger = require('../utils/logger')

personRouter.get('/', (request, response, next) => {
    Person.find({})
        .then(persons => {
            response.json(persons)
        }).catch(error => next(error))
})

personRouter.get('/info', (request, response, next) => {
    Person.find({})
        .then(persons => {
            if (persons.length) {
                const length = persons.length
                const timestamp = new Date()
                response.send(`Phonebook has information for ${length} people </br></br> ${timestamp} `)
            } else {
                response.send('Phonebook is empty!')
            }
        }).catch(error => next(error))
})

personRouter.get('/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person)
                response.json(person)
            else
                response.status(404).end()
        }).catch(error => next(error))
})

personRouter.delete('/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(person => {
            if (person) {
                logger.info(`Deleted Person: ${person} successfully!`)
                response.status(204).end()
            } else {
                logger.info(person)
                response.status(404).end()
            }
        }).catch(error => next(error))
})

personRouter.post('/', (request, response, next) => {
    const body = request.body
    // If request body does not contain required parameter, return with error code 400
    if (!body.name) {
        return response.status(400).json({
            error: 'name is missing'
        })
    }

    // declaring Person object with values
    let newPerson = new Person({
        name: body.name,
        number: body.number
    })

    newPerson.save().then(person => {
        logger.info('Person saved successfully!')
        response.json(person)
    }).catch(error => next(error))
})

personRouter.put('/:id', (request, response, next) => {
    const body = request.body
    const person = {
        number: body.number
    }
    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
        .then(updatedPerson => {
            logger.info('updated person object')
            response.json(updatedPerson)
        }).catch(error => next(error))
})

module.exports = personRouter