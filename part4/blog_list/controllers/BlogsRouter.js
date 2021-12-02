const Blog = require('../models/Blog')
const router = require('express').Router()

const apiRoot = '/api/blogs'

router.get('/', async (request, response) => {
  const respondedBlogs = await Blog.find({})
  response.json(respondedBlogs)
})

router.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const result = await blog.save()
  response.status(201).json(result)
})

router.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndRemove(request.params.id)
  response.status(204).json(result)
})

router.put('/:id', async (request, response) => {

  const result = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true, runValidators: true})
  console.log(result)
  response.json(result)
})

module.exports = {router, apiRoot}