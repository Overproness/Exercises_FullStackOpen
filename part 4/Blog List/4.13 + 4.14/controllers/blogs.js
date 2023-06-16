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

  blogsRouter.delete('/:id', async (request, response) => {
    const id = (request.params.id)
    console.log(id);
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  })

  blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    const result = await Blog.findByIdAndUpdate(request.params.id, blog, {new: 'ture'})
    response.status(204).json(result)
  })

module.exports = blogsRouter