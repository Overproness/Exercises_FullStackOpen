require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

// let persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

// const generateID = () => {
//   const id = Math.floor(Math.random() * 1000000) * Math.floor(Math.random() * 1000000)
//   return id
// }

const requestLogger = (request, response, next) => {
  console.log(JSON.stringify(request.body))
  next()
}

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))


app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

// app.get('/info', (request, response) => {
//     const date = new Date()
//     response.send(`<p>PhoneBook has info about ${persons.length} people.</p><p>${date}</p>`)
// })

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    
    Person.findById(id).then(person => {
      response.json(person)
    })
})
// app.delete('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     persons = persons.filter(person => person.id !== id)
//     response.status(204).end()
// })
// app.post('/api/persons', requestLogger, (request, response) => {
//   const body = request.body
//   const names = persons.map(element => element.name)

//   if(!body.name){
//     return response.status(400).json({error: 'name missing'})
//   }
//   if(!body.number){
//     return response.status(404).json({error: 'number is missing'})
//   }
//   if(names.includes(body.name)){
//     return response.status(409).json({error: 'name already exists'})
//   }
  
//   const person = {
//     name: body.name,
//     date: new Date(),
//     number: body.number,
//     id: generateID()
//   }
  
//   persons = persons.concat(person)
//   response.json(person)
// })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('Server Running on ', PORT)
})