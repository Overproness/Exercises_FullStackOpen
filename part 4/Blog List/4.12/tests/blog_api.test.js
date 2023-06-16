const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)


describe('tests to see if backend is working with DB',()=>{
    beforeEach(async ()=>{
        await Blog.deleteMany({})
    
        const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

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

    test('id is used in backend instead of _id', async ()=>{
        const allBlogs = await helper.allBlogsInDB()
        expect(allBlogs[Math.floor(Math.random() * 6)]._id).toBeUndefined()
    })

    test('if likes are not defined', async ()=>{
        const newBlog = {
            title: 'To kill a mocking bird',
            author: 'Shakespear',
            url: 'www.example.com/blogs'
        }

        if(!newBlog.likes){
            await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

            const allBlogs = await helper.allBlogsInDB()
            expect(allBlogs[helper.initialBlogs.length].likes).toBe(0)
        }
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

    afterAll(async ()=> {
        await mongoose.connection.close()
    })
})