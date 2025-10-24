const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('get users returns it', async () => {
    const usersAtStart = await helper.usersInDb()
    const usersReturned = await api
      .get('/api/users')
      .expect(200)

    assert.deepStrictEqual(usersAtStart, usersReturned.body)
  })
})

describe('creating a user', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('without a password fails with correct error message', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'shouldnotexist',
      name: 'User without a password',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('password missing'))
    const usersAtEnd = await helper.usersInDb()
    assert.deepStrictEqual(usersAtEnd, usersAtStart)
  })

  test('with too short password fails with correct error message', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'shouldnotexist',
      name: 'User with too short password',
      password: 'aa'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('password must be at least 3 characters long'))
    const usersAtEnd = await helper.usersInDb()
    assert.deepStrictEqual(usersAtEnd, usersAtStart)
  })

  test('with too short username fails with correct error message', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'aa',
      name: 'User with too short username',
      password: 'supersalainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('User validation failed: username: Path `username` (`aa`, length 2) is shorter than the minimum allowed length (3).'))
    assert.deepStrictEqual(usersAtEnd, usersAtStart)
  })
})

after(async () => {
  await mongoose.connection.close()
})
