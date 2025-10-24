const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

describe('get blogs', () => {
  beforeEach(async () => {
    await helper.resetBlogsDb()
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
    await helper.resetBlogsDb()
  })

  test('adds a blog to the db', async () => {
    const blogsBefore = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + await helper.getToken('root'))
      .send(newBlog)
      .expect(201)
    const blogsAfter = await helper.blogsInDb()
    assert.strictEqual(blogsAfter.length, blogsBefore.length + 1)
  })

  test('creates a blog with correct data', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + await helper.getToken('root'))
      .send(newBlog)
      .expect(201)
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
      .set('Authorization', 'Bearer ' + await helper.getToken('root'))
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
      .set('Authorization', 'Bearer ' + await helper.getToken('root'))
      .send({
        author: 'Matti Luukkainen',
        url: 'https://fullstackopen.com',
      })
      .expect(400)

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + await helper.getToken('root'))
      .send({
        author: 'Matti Luukkainen',
        title: 'Syväsukellus moderniin websovelluskehitykseen',
      })
      .expect(400)
  })

  test('without a token fails with 401', async () => {
    const blogsBefore = await helper.blogsInDb()
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
    const blogsAfter = await helper.blogsInDb()
    assert.strictEqual(blogsAfter.length, blogsBefore.length)
  })
})

describe('deleting a blog', async () => {
  beforeEach(async () => {
    await helper.resetBlogsDb()
  })

  test('with existing id deletes it', async () => {
    const blogs = await helper.blogsInDb()
    await api
      .delete(`/api/blogs/${blogs[0].id}`)
      .set('Authorization', 'Bearer ' + await helper.getToken('root'))
      .expect(204)

    const blogsAfter = await helper.blogsInDb()
    assert.strictEqual(blogsAfter.length, blogs.length - 1)
  })

  test('that does not exist fails with 404', async () => {
    await api
      .delete('/api/blogs/68f4f2c051f90c5d6022dc74')
      .set('Authorization', 'Bearer ' + await helper.getToken('root'))
      .expect(404)
  })

  test('without token fails with 401', async () => {
    const blogs = await helper.blogsInDb()
    const result = await api
      .delete(`/api/blogs/${blogs[0].id}`)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('token missing or invalid'))
    const blogsAfter = await helper.blogsInDb()
    assert.strictEqual(blogsAfter.length, blogs.length)
  })

  test('fails if user is not the logged in user', async () => {
    const blogs = await helper.blogsInDb()
    const user = await helper.createUser('otheruser', 'sekret')

    const result = await api
      .delete(`/api/blogs/${blogs[0].id}`)
      .set('Authorization', 'Bearer ' + await helper.getToken(user.username))
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('only the owner can delete a blog'))
    const blogsAfter = await helper.blogsInDb()
    assert.strictEqual(blogsAfter.length, blogs.length)
  })
})

describe('updating a blog', async () => {
  const newData = {
    author: 'Matti Luukkainen',
    title: 'Syväsukellus moderniin websovelluskehitykseen',
    url: 'https://fullstackopen.com',
    likes: 500,
  }

  beforeEach(async () => {
    await helper.resetBlogsDb()
  })

  test('that exists saves the new data', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newData)
      .expect(200)
    const updatedBlog = (await helper.blogsInDb()).find(blog => blog.id === blogToUpdate.id)
    assert.strictEqual(updatedBlog.title, newData.title)
    assert.strictEqual(updatedBlog.author, newData.author)
    assert.strictEqual(updatedBlog.url, newData.url)
    assert.strictEqual(updatedBlog.likes, newData.likes)
  })

  test('returns the updated blog', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]
    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newData)
      .expect(200)
    const updatedBlog = response.body
    assert.strictEqual(updatedBlog.title, newData.title)
    assert.strictEqual(updatedBlog.author, newData.author)
    assert.strictEqual(updatedBlog.url, newData.url)
    assert.strictEqual(updatedBlog.likes, newData.likes)
  })

  test('with invalid id fails with 404', async () => {
    const nonExistingId = await helper.nonExistingId()
    await api
      .put(`/api/blogs/${nonExistingId}`)
      .send(newData)
      .expect(404)
  })
})

after(async () => {
  await mongoose.connection.close()
})
