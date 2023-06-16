const _ =require('lodash')
const __ = require('lodash-contrib')

const totalLikes = (blogs)=>{
    const result = blogs.reduce((sum, like) =>{
        return sum + like.likes
    }, 0)
    return result
}

const favouriteBlog =(blogs)=>{
    const likesArray = blogs.map(blog => blog.likes)
    const index = likesArray.findIndex(element => element === Math.max(...likesArray))
    return blogs[index]
}

const mostBlogs=(blogs)=>{

    const authors_blogs_object = __.frequencies(blogs.map(blog => blog.author))
    const authors = Object.keys(authors_blogs_object)
    const no_of_blogs_of_all = Object.values(authors_blogs_object)
    const author = authors[authors.length -1]
    const most_no_of_blogs_per_person = no_of_blogs_of_all[no_of_blogs_of_all.length - 1]
    const result = {
        author,
        Blogs: most_no_of_blogs_per_person
    }
    
    return result
}

const mostLikes =(blogs)=>{
    const likesArray = blogs.map(blog => blog.likes)
    const authorsArray = blogs.map(blog => blog.author)
    const mostLikes = Math.max(...likesArray)
    const index = likesArray.indexOf(mostLikes)
    const result = {
        author: authorsArray[index],
        likes: mostLikes
    }
    return result
}

module.exports ={
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}