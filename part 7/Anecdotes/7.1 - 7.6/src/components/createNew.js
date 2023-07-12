import { useNavigate } from "react-router"
import { useField } from "../hooks"

const CreateNew = (props) => {
    const Navigate = useNavigate()

    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info:info.value,
        votes: 0,
        id: props.anecdotes.length + 1
      })
      Navigate('/')
      props.setNotification(`A new Anecdote '${content}' has been added. `)
      setTimeout(() => { 
        props.setNotification(null)
       }, 5000)
    }
  
    const handleReset = () => {
      content.reset()
      author.reset()
      info.reset()
    }

    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content.input}/>
          </div>
          <div>
            author
            <input {...author.input} />
          </div>
          <div>
            url for more info
            <input {...info.input} />
          </div>
          <button type="submit">create</button>
        </form>
        <button onClick={handleReset} >reset</button>
      </div>
    )
  
}

export default CreateNew