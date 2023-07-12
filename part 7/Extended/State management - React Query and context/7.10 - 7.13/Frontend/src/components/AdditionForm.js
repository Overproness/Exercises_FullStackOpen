import { useState } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { create } from '../services/blogs'
import { useNotificationDispatcher } from '../notificationContext'
import { useStatusCodeDispatcher } from '../statusCodeContext'

const AdditionForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const queryClient = useQueryClient()
  const notificationDispatcher = useNotificationDispatcher()
  const statusCodeDispatcher = useStatusCodeDispatcher()
  const newBlogMutation = useMutation(create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(newBlog))
      notificationDispatcher({
        type: 'CREATION',
        payload: title,
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

  const addBlog = (event) => {
    event.preventDefault()
    newBlogMutation.mutate({
      title,
      author,
      url,
      likes: 0,
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <p>
          Title:{' '}
          <input
            type="text"
            value={title}
            id="title-input"
            onChange={(event) => setTitle(event.target.value)}
          />
        </p>
        <p>
          Author:{' '}
          <input
            type="text"
            id="author-input"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </p>
        <p>
          Url:{' '}
          <input
            type="text"
            value={url}
            id="url-input"
            onChange={(event) => setUrl(event.target.value)}
          />
        </p>
        <button type="submit" id="blog-submit">
          Submit
        </button>
      </form>
    </>
  )
}

export default AdditionForm
