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

module.exports ={
    totalLikes,
    favouriteBlog
}