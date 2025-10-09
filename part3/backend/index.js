const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.static('dist'))

morgan.token('post_data', (req, _res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  } else {
    return ''
  }
})

app.use(express.json())
// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post_data'))

const persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    // console.log(`Found person ${person}`)
    response.json(person)
  } else {
    // console.log(`Person with id ${id} not found!`)
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  const index = persons.indexOf(person)
  if (index !== -1) {
    // console.log('Deleting person:')
    // console.log(persons[index])

    persons.splice(index, 1)
    response.status(200).end()
  } else {
    // console.log(`Deleting failed, person with id ${id} not found`)
    response.status(404).end()
  }
})

app.get('/api/persons', (request, response) => {
  // persons.forEach(person => console.log(person))
  response.json(persons)
})

app.post('/api/persons', (request, response) => {
  const new_person = request.body
  if (!new_person.name) {
    response.json({ "error": "Name missing" })
    response.status(400).end()
    return
  } else if (!new_person.number) {
    response.json({ "error": "Name missing" })
    response.status(400).end()
    return
  }

  const duplicate_name = persons.find(person => person.name === new_person.name)
  if (duplicate_name) {
    response.json({ "error": "Name must be unique" })
    response.status(400).end()
    return
  }

  const id = String(Math.floor(Math.random() * 4000000000))
  new_person.id = id
  // console.log('Created new person:')
  // console.log(new_person)
  persons.push(new_person)
  response.json(new_person)
  response.status(201).end()
})

app.get('/', (request, response) => {
  const date = new Date();
  response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date.toString()}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
