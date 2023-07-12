import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { likeBlogs, deleteBlog, addComment } from '../reducers/blogReducer'
import { useState } from 'react'

const IndiviualBlog = () => {
  const id = useParams().id
  const [comment, setComment] = useState('')
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((blog) => blog.id === id)
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
  const blogDeleter = (id) => {
    dispatch(deleteBlog(id))
    navigate('/')
  }
  const handleCommentAddition = (event) => {
    event.preventDefault()
    dispatch(addComment(comment, id))
  }

  const handleDelete = () => {
    window.confirm(`Do you want to the Blog '${blog.title}'?`)
      ? blogDeleter(blog.id)
      : null
  }
  if (!blog) {
    return null
  }
  return (
    <>
      <h1>{blog.title}</h1>
      <Link to={blog.url}>{blog.url}</Link>
      <p>
        {blog.likes} likes{' '}
        <button id="like-button" onClick={updateLikes}>
          Like
        </button>
      </p>
      <p>Added by {blog.user.name}</p>
      <p>
        <button id="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </p>
      <h2>Comments</h2>
      <div>
        <form onSubmit={handleCommentAddition}>
          <input
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <button type="submit">Add Comment</button>
        </form>
      </div>
      {blog.comments && (
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.length * Math.floor(Math.random() * 500)}>
              {comment}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default IndiviualBlog
