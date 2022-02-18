const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')
const morgan = require('morgan')
const { response } = require('express')
morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('build'))

/**
 * Method to generate random number between 1-100
 * 
 * @returns 
 */
// const generateId = () => {
//     return Math.floor(Math.random() * 100)
// }

app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(persons => {
            response.json(persons)
        }).catch(error => next(error))
})

app.get('/api/info', (request, response, next) => {
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

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person)
                response.json(person)
            else
                response.status(404).end()
        }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(person => {
            if (person) {
                console.log(`Deleted Person: ${person} successfully!`)
                response.status(204).end()
            } else {
                console.log(person)
                response.status(404).end()
            }
        }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
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
        console.log('Person saved successfully!')
        response.json(person)
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
        number: body.number
    }
    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
        .then(updatedPerson => {
            console.log('updated person object')
            response.json(updatedPerson)
        }).catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
