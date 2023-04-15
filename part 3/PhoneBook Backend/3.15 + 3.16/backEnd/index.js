require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
// const cors = require('cors')
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
app.use(express.json())
app.use(requestLogger)
// app.use(cors())
app.use(morgan('tiny'))



app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/info', (request, response) => {
    Person.find({}).then(result => {
      const date = new Date()
      response.send(`<p>PhoneBook has info about ${result.length} people.</p><p>${date}</p>`)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
      .then(person => {
        if(note){
          response.json(person)
        }
        else{
          response.status(404).end()
        }
      })
      .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
      .then(result => {
        console.log(result)
        response.status(204).end()
      })
      .catch(error => next(error))
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if(body.name === undefined){
    return response.status(400).json({error: 'name missing'})
  }
  
  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(result => {
    response.json(result)
  })
})

const unkownEndpoint = (request, response) => {
  response.status(404).send({error: 'unkown Endpoint'})
}

app.use(unkownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if(error.name === 'CastError'){
    response.status(400).send({error: 'malformed id'})
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('Server Running on ', PORT)
})