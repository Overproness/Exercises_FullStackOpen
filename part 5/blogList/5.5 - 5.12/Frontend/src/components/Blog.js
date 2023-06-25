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

  const visibilityStyle = !visible ? 'notExpandedBlogs' : 'expandedBlogs'

  return (
    <div className={visibilityStyle}>
      <div>
        <p>{blog.title}</p>
        <p>{blog.user.username || user.username}</p>
        <button onClick={toggleVisibility}>{!visible ? 'Show' : 'Hide'}</button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>{blog.user.username === user.username && (<button onClick={handleDelete}>Delete</button>)}
          <p>{blog.likes}   <button onClick={updateLikes}>Like</button></p>
        </div>
      )}
    </div>
  )
}

export default Blog