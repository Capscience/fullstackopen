const error = require('./logger').error

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (errorObject, _request, response, next) => {
  error(errorObject.message)

  if (errorObject.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (errorObject.name === 'ValidationError') {
    return response.status(400).json({ error: errorObject.message })
  } else if (errorObject.name === 'SyntaxError') {
    return response.status(400).json({ error: errorObject.message })
  }

  next(errorObject)
}

module.exports = {
  unknownEndpoint,
  errorHandler
}
