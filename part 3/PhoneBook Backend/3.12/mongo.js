const mongoose = require('mongoose')

if(process.argv<3){
    console.log('Please give password as an argument. ');
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstackopenexer:${password}@cluster0.v09vxqm.mongodb.net/phoneBook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)


if(process.argv.length<4){
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person);
        })
        mongoose.connection.close()
    })
}
if(process.argv.length>4){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    
    person.save().then(result => {
        console.log('Saved!');
        console.log(`Added ${person.name} number ${person.number} to the Phonebook`);
        mongoose.connection.close()
    })
}





