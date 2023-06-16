const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async ()=>{
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved',()=>{

    test('to see amount of blogs',async ()=>{
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('to see if the data returned by DB is in JSON form', async ()=>{
        await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
    })

    test('id is used in backend instead of _id', async ()=>{
        const allBlogs = await helper.allBlogsInDB()
        expect(allBlogs[Math.floor(Math.random() * 6)]._id).toBeUndefined()
    })
})


describe('addition of a new blog', ()=>{
    test('a valid blog can be added', async ()=>{
        const newBlog = {
            title: 'To kill a mocking bird',
            author: 'Shakespear',
            url: 'www.example.com/blogs',
            likes: 24
        }
        await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

        const allBlogs = await helper.allBlogsInDB()
        expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
        const blogTitles = allBlogs.map(blog => blog.title)
        expect(blogTitles).toContainEqual('To kill a mocking bird')
    })

    test('if likes are not defined', async ()=>{
        const newBlog = {
            title: 'To kill a mocking bird',
            author: 'Shakespear',
            url: 'www.example.com/blogs'
        }
            await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

            const allBlogs = await helper.allBlogsInDB()
            expect(allBlogs[helper.initialBlogs.length].likes).toBe(0)
    })

    test('if title and url are not defined', async ()=>{
        const newBlog = {
            author: 'Shakespear',
            likes: 24
        }

        await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)

        const allBlogs = await helper.allBlogsInDB()
        expect(allBlogs).toHaveLength(helper.initialBlogs.length)
    })
})

describe('to do things to a specific blog', ()=>{
    test('deleting a blog', async ()=> {
        const blogsAtFirst = await helper.allBlogsInDB()
        const blogToDelete = blogsAtFirst[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtTheEnd = await helper.allBlogsInDB()
        expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length -1)
        const titles = blogsAtTheEnd.map(blog => blog.title)
        expect(titles).not.toContainEqual(blogToDelete.title)
    })

    test('updating a blog works',async () => {
        const allBlogs = await helper.allBlogsInDB()
        const newLikes = allBlogs[0].likes + Math.floor(Math.random() * 34)
        const blogToUpdate = {...allBlogs[0], likes: newLikes}

        await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(204)

        const blogsAtEnd = await helper.allBlogsInDB()
        const blogsLikes = blogsAtEnd.map(blog => blog.likes)
        expect(blogToUpdate.likes).toBe(blogsLikes[0])
    })
})

afterAll(async ()=> {
    await mongoose.connection.close()
})