import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Button, TextField } from '@mui/material'

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
        comments: [],
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
        <div>
          Title:{' '}
          <TextField
            type="text"
            value={title}
            id="title-input"
            onChange={(event) => setTitle(event.target.value)}
            label="title"
          />
        </div>
        <div>
          Author:{' '}
          <TextField
            type="text"
            id="author-input"
            value={author}
            label="author"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          Url:{' '}
          <TextField
            type="text"
            value={url}
            id="url-input"
            label="url"
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          id="blog-submit"
        >
          Submit
        </Button>
      </form>
    </>
  )
}

export default AdditionForm
