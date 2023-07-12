import { useState } from 'react'
import { likeBlogs, deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogDeleter = (id) => {
    dispatch(deleteBlog(id))
  }

  const updateLikes = () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    dispatch(likeBlogs(newBlog, blog.id))
  }

  const handleDelete = () => {
    window.confirm(`Do you want to the Blog '${blog.title}'?`)
      ? blogDeleter(blog.id)
      : toggleVisibility()
  }

  return (
    <div className={'blog'} id="blog">
      <p>
        {blog.title}{' '}
        <button id="visibilityButton" onClick={toggleVisibility}>
          {!visible ? 'Show' : 'Hide'}
        </button>
      </p>
      <p>{blog.user.username || user.username}</p>
      {visible && (
        <>
          <p id="blog-details">
            {blog.url}
            {blog.user.username === user.username && (
              <button id="delete-button" onClick={handleDelete}>
                Delete
              </button>
            )}
          </p>
          <p>
            {blog.likes}{' '}
            <button id="like-button" onClick={updateLikes}>
              Like
            </button>
          </p>
        </>
      )}
    </div>
  )
}

export default Blog
