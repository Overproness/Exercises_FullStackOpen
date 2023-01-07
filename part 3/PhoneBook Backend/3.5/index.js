const express = require('express')
const app = express()

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

const generateID = () => {
  const id = Math.floor(Math.random() * 1000000)
  return id
}


app.use(express.json())


app.get('/api/persons', (request, response) => response.send(persons))
app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`<p>PhoneBook has info about ${persons.length} people.</p><p>${date.toDateString}</p>`)
})
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        response.send(person)
    }
    else{
        response.status(404).end()
    }
})
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})
app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!(body.name || body.number)){
    return response.status(400).json({error: 'content missing'})
  }
  
  const person = {
    name: body.name,
    date: new Date(),
    number: body.number,
    id: generateID()
  }
  
  persons = persons.concat(person)
  response.json(person)
})


const PORT = 3001
app.listen(PORT)