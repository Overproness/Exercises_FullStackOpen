const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.post('/', async (request, response)=>{
    const { username, name, password } = request.body

    if(password.length < 3){
        return response.status(400).json({
            error: 'The Password must be at least 3 characters long'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

userRouter.get('/', async (request, response)=>{
    const users = await User.find({}).populate('blogs', {
        author: 1,
        title: 1,
        url:1,
        likes:1
    })
    response.json(users)
})

module.exports = userRouter