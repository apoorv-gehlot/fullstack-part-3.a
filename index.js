require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(cors())

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
app.use(express.static('build'))

/**
 * Method to generate random number between 1-100
 * 
 * @returns 
 */
const generateId = () => {
    return Math.floor(Math.random() * 100)
}

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons =>{
        response.json(persons)
    })
})

app.get('/api/info', (request, response) => {
    Person.find({}).then(persons =>{
        if(persons.length){
            const length = persons.length
            const timestamp = new Date()
            response.send(`Phonebook has information for ${length} people </br></br> ${timestamp} `)
        } else {
            response.send('Phonebook is empty!')
        }
    })
    
})

app.get('/api/persons/:id', (request, response) => {
    // The param from request is of string type, transform in to number before matching.
    const personId = Number(request.params.id)

    Person.findById(personId)
    .then(person =>{
        if(person)
            response.json(person)
        else
            response.status(404).end()

        // mongoose.connection.close()
    }).catch(error =>{
        console.log(error)
        // mongoose.connection.close()
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const personId = Number(request.params.id)

    Person.findByIdAndDelete(personId)
    .then(person =>{
        if(person){
            console.log(`Deleted Person: ${person} successfully!`)
            response.status(204).end()
        }else{
            console.log(person)
            response.status(404).end()
        }
        // mongoose.connection.close()
    }).catch(error=>{
        console.log(error)
        // mongoose.connection.close()
    })
})

app.post('/api/persons', (request, response) => {

    const body = request.body
    // If request body does not contain required parameter, return with error code 400
    if (!body.name) {
        return response.status(400).json({
            error: 'name is missing'
        })
    }

    // declaring Person object with values
    let newPerson = new Person({
        _id: generateId(),
        name: body.name,
        number: body.number
    })

    newPerson.save().then(person =>{
        console.log('Person saved successfully!')
        // mongoose.connection.close()
        response.json(person)
    }).catch((error) =>{
        console.error('Error while saving person data.', error.message)
        // mongoose.connection.close()
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
