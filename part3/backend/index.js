require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
app.use(express.static('dist'))
app.use(express.json())

morgan.token('post_data', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  } else {
    return ''
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post_data'))

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        // console.log(`Found person ${person}`)
        response.json(person)
      } else {
        // console.log(`Person with id ${id} not found!`)
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})

app.get('/api/persons', (_request, response, next) => {
  // persons.forEach(person => console.log(person))
  Person.find({})
    .then(people => {
      if (people) { response.json(people) } else { response.status(404).end() }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body
  if (!name) {
    response.json({ error: 'Name missing' })
    response.status(400).end()
    return
  } else if (!number) {
    response.json({ error: 'Number missing' })
    response.status(400).end()
    return
  }

  Person.find({ name: name })
    .then(duplicates => {
      if (duplicates.length > 0) {
        response.json({ error: `Person ${name} already exists!` })
        response.status(400).end()
      } else {
        const new_person = new Person({
          name: name,
          number: number,
        })
        new_person.save()
          .then(savedPerson => {
            console.log(savedPerson)
            response.json(savedPerson)
            response.status(201).end()
          })
          .catch(error => next(error))
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { number } = request.body
  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }
      person.number = number

      return person.save()
        .then((updatedPerson) => {
          response.json(updatedPerson)
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

app.get('/info', (_request, response, next) => {
  const date = new Date()
  Person.find({})
    .then(people => {
      response.send(`<p>Phonebook has info for ${people.length} people</p><p>${date.toString()}</p>`)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, _request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
