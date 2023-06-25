import { useState } from 'react'

const AdditionForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    props.createBlog({
      title,
      author,
      url
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return(
    <>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <p>Title: <input type="text" value={title} onChange={event => setTitle(event.target.value)} /></p>
        <p>Author: <input type="text" value={author} onChange={event => setAuthor(event.target.value)} /></p>
        <p>Url: <input type="text" value={url} onChange={event => setUrl(event.target.value)} /></p>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default AdditionForm