require('dotenv').config()
const mongoose = require('mongoose')

// const password = process.argv[2]
// const url = `mongodb+srv://apGehlot:${password}@cluster0.v06ww.mongodb.net/people-app?retryWrites=true&w=majority`
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI).then((result) => {
    console.log('Connected to MonoDB')
}).catch((error) => {
    console.error('Error while connecting to MongoDB', error.message)
})

/**
 * Person schema where person name is a mandatory field.
 * Custom validation is applied for the phone number.
 */
const personSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'Cannot be less than 3'],
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{2}-\d{9}/.test(v)
            },
            message: props => `'${props.value}' is not a valid phone number!`
        }
    }
});

/**
 * One way to format the objects returned by Mongoose is to modify the toJSON method of the schema, 
 * which is used on all instances of the models produced with that schema.
 */
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)