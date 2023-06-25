import { useState } from 'react'

const Blog = ({ blog, user, likesUpdater, blogDeleter }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateLikes = () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    likesUpdater(newBlog, blog.id)
  }

  const handleDelete = () => {
    window.confirm(`Do you want to the Blog '${blog.title}'?`)
      ? blogDeleter(blog.id)
      : toggleVisibility()
  }

  return (
    <div className={'blog'} id='blog'>
      <p>{blog.title}   <button id='visibilityButton' onClick={toggleVisibility}>{!visible ? 'Show' : 'Hide'}</button></p>
      <p>{blog.user.username || user.username}</p>
      {visible && (
        <>
          <p id='blog-details'>{blog.url}{blog.user.username === user.username && (<button id='delete-button' onClick={handleDelete}>Delete</button>)}</p>
          <p>{blog.likes}   <button id='like-button' onClick={updateLikes}>Like</button></p>
        </>
      )}
    </div>
  )
}

export default Blog