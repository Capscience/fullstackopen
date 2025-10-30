const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }
  if (blog.user.toString() === request.user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  } else {
    return response.status(401).json({ error: 'only the owner can delete a blog' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { author, title, url, likes, user } = request.body

  const blog = await Blog.findById(request.params.id)
  if (!blog) response.status(404).end()

  blog.author = author
  blog.title = title
  blog.url = url
  blog.likes = likes
  blog.user = user
  const updatedBlog = await blog.save()
  const blogWithUser = await Blog.findById(updatedBlog.id).populate('user', { username: 1, name: 1 })
  response.json(blogWithUser)
})

module.exports = blogsRouter
