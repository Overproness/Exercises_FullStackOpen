const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const allBlogs = await Blog.find({})
    response.json(allBlogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if(!blog.likes){
      blog.likes = 0
    }
    if(blog.title && blog.url){
      const result = await blog.save()
      response.status(201).json(result)
    } else {
      response.status(400).send({error: 'Title or URL are missing. '})
    }
    

  })

module.exports = blogsRouter