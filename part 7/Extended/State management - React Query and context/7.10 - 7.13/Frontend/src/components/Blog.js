import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { update, remove } from '../services/blogs'
import { useNotificationDispatcher } from '../notificationContext'
import { useStatusCodeDispatcher } from '../statusCodeContext'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const queryClient = useQueryClient()
  const notificationDispatcher = useNotificationDispatcher()
  const statusCodeDispatcher = useStatusCodeDispatcher()

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const updateBlogMutation = useMutation(update, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        'blogs',
        blogs.map((blog) => (blog.id === newBlog.id ? newBlog : blog))
      )
    },
    onError: (error) => {
      notificationDispatcher({
        type: 'ERR',
        payload: error.message,
      })
      statusCodeDispatcher({
        type: 'SET',
        payload: 400,
      })
      setTimeout(() => {
        notificationDispatcher({
          type: 'RESET',
        })
        statusCodeDispatcher({
          type: 'RESET',
        })
      }, 5000)
    },
  })

  const deleteBlogMutation = useMutation(remove, {
    onSuccess: (response) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        'blogs',
        blogs.filter((blog) => blog.id !== response.id)
      )
      notificationDispatcher({
        type: 'DELETE',
        payload: blogs.find((blog) => blog.id === response.id).title,
      })
      statusCodeDispatcher({
        type: 'SET',
        payload: 201,
      })
      setTimeout(() => {
        notificationDispatcher({
          type: 'RESET',
        })
        statusCodeDispatcher({
          type: 'RESET',
        })
      }, 5000)
    },
    onError: (error) => {
      notificationDispatcher({
        type: 'ERR',
        payload: error.message,
      })
      statusCodeDispatcher({
        type: 'SET',
        payload: 400,
      })
      setTimeout(() => {
        notificationDispatcher({
          type: 'RESET',
        })
        statusCodeDispatcher({
          type: 'RESET',
        })
      }, 5000)
    },
  })

  const updateLikes = () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    updateBlogMutation.mutate(newBlog, blog.id)
    notificationDispatcher({
      type: 'Like',
      payload: blog.title,
    })
    statusCodeDispatcher({
      type: 'SET',
      payload: 200,
    })
    setTimeout(() => {
      notificationDispatcher({
        type: 'RESET',
      })
      statusCodeDispatcher({
        type: 'RESET',
      })
    }, 5000)
  }

  const handleDelete = () => {
    window.confirm(`Do you want to the Blog '${blog.title}'?`)
      ? deleteBlogMutation.mutate(blog.id)
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
