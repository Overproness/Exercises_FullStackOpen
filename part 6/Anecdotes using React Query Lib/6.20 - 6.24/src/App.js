import { useMutation, useQuery, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const notificationDispatcher = useNotificationDispatch()
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => anecdote.id === newAnecdote.id ? newAnecdote : anecdote))
    }
  })

  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: 1
  })

  const handleVote = (anecdote) => {
    const newAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    updateAnecdoteMutation.mutate(newAnecdote)
    notificationDispatcher({
      type: 'UP_VOTE',
      payload: anecdote.content
    })
    setTimeout(() => { 
      notificationDispatcher({
        type: 'RESET'
      })
     }, 5000)
  }

  if(result.isLoading){
    return (
      <div>Loading Data....</div>
    )
  } else if(result.isError){
    return(
      <div>Anecdote Service not available due to server problems. </div>
    )
  }

  const anecdotes = result.data
  
  return (
    <div>
       <h3>Anecdote app</h3>
       <Notification />
       <AnecdoteForm />
       {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
