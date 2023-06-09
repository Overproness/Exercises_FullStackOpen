const totalLikes = (blogs)=>{
    const result = blogs.reduce((sum, like) =>{
        return sum + like.likes
    }, 0)
    return result
}

module.exports ={
    totalLikes
}