import { useMutation, useQueryClient } from "react-query"
import { createAnecdotes } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatcher = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdotes, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if(content.length >= 5){
      newAnecdoteMutation.mutate({
        content, 
        votes: 0
      })
      notificationDispatcher({
        type: 'CREATION',
        payload: content
      })
      setTimeout(() => { 
        notificationDispatcher({
          type: 'RESET'
        }) 
      }, 5000)
    } else{
      notificationDispatcher({
        type: 'LENGTH_ERR'
      })
      setTimeout(() => { 
        notificationDispatcher({
          type: 'RESET'
        }) 
      }, 5000)    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
