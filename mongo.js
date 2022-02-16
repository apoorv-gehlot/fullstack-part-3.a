const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://apGehlot:${password}@cluster0.v06ww.mongodb.net/people-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: "Arto Hellas",
    number: "040-123456"
})

const isSaveReq = process.argv[3]
// console.log(typeof isSaveReq)
// console.log(isSaveReq)
if(isSaveReq === 'yes'){
    person.save().then(result =>{
        console.log('Person saved')
        mongoose.connection.close()
    })
}else {
    Person.find({}).then(persons =>{
        persons.forEach(person =>{
            console.log(person)
        })
        mongoose.connection.close()
    })
}
