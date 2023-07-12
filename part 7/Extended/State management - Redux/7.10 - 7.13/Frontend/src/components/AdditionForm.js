import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const AdditionForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(
      createBlog({
        title,
        author,
        url,
        likes: 0,
      })
    )
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
