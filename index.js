const express = require('express')
const morgan = require('morgan')

const app = express()

morgan.token('body', (req, res) => JSON.stringify(req.body));

/**
 * In order to access the data easily, we need the help of the express json-parser 
 * that is taken to use with command app.use(express.json()).
 * 
 * The json-parser functions so that it takes the JSON data from the request and transforms
 * it into JavaScript object and attaches it to the body property of request object before
 * the route handler is called.
 */
app.use(express.json())
// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

/**
 * Method to generate random number between 1-100
 * 
 * @returns 
 */
const generateId = () => {
    return Math.floor(Math.random() * 100)
}

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => {
    const lenght = persons.length
    const timestamp = new Date()
    response.send(`Phonebook has information for ${lenght} people </br></br> ${timestamp} `)
})

app.get('/api/persons/:id', (request, response) => {
    // The param from request is of string type, transform in to number before matching.
    const personId = Number(request.params.id)
    const person = persons.find(p => p.id === personId)

    // If person is not found return 404 'Not Found' error
    if (person)
        response.json(person)
    else
        response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const personId = Number(request.params.id)
    persons = persons.filter(p => p.id !== personId)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {

    const body = request.body
    // If request body does not contain required parameter, return with error code 400
    if (!body.name) {
        return response.status(400).json({
            error: 'name is missing'
        })
    }

    let newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(newPerson)
    response.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})