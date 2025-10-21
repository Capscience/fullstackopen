const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

describe('get blogs', () => {
  beforeEach(async () => {
    await helper.resetDb()
  })

  test('returns blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns the correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('returns blogs with a field `id`', async () => {
    const response = await api.get('/api/blogs')
    const first_blog = response.body[0]
    assert('id' in first_blog)
  })
})

describe('posting a blog', async () => {
  const newBlog = {
    author: 'Matti Luukkainen',
    title: 'Syväsukellus moderniin websovelluskehitykseen',
    url: 'https://fullstackopen.com',
    likes: 3,
  }

  beforeEach(async () => {
    await helper.resetDb()
  })

  test('adds a blog to the db', async () => {
    const blogsBefore = await helper.blogsInDb()
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
    const blogsAfter = await helper.blogsInDb()
    assert.strictEqual(blogsAfter.length, blogsBefore.length + 1)
  })

  test('creates a blog with correct data', async () => {
    await api.post('/api/blogs').send(newBlog).expect(201)
    const blogs = await helper.blogsInDb()
    const addedBlog = blogs.find(blog => blog.author === 'Matti Luukkainen')
    assert.strictEqual(addedBlog.author, newBlog.author)
    assert.strictEqual(addedBlog.title, newBlog.title)
    assert.strictEqual(addedBlog.url, newBlog.url)
    assert.strictEqual(addedBlog.likes, newBlog.likes)
  })

  test('without likes sets them 0', async () => {
    await api
      .post('/api/blogs')
      .send({
        author: 'Matti Luukkainen',
        title: 'Syväsukellus moderniin websovelluskehitykseen',
        url: 'https://fullstackopen.com',
      })
      .expect(201)
    const blogs = await helper.blogsInDb()
    const addedBlog = blogs.find(blog => blog.author === 'Matti Luukkainen')
    assert.strictEqual(addedBlog.likes, 0)
  })

  test('without required fields returns 400', async () => {
    await api
      .post('/api/blogs')
      .send({
        author: 'Matti Luukkainen',
        url: 'https://fullstackopen.com',
      })
      .expect(400)

    await api
      .post('/api/blogs')
      .send({
        author: 'Matti Luukkainen',
        title: 'Syväsukellus moderniin websovelluskehitykseen',
      })
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})
