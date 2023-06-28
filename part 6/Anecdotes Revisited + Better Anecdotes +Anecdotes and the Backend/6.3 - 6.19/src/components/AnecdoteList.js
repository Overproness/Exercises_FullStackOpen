import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({anecdote, handleClick}) => {
    return(
        <li>
            <p>{anecdote.content}</p>
            <p>has {anecdote.votes} <button onClick={handleClick}>Vote</button></p>
        </li>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes}) => {
        if(filter === ''){
            return anecdotes
        }
        return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    })

    return(
        <div>
            <ul>
                {[...anecdotes].sort((a,b)=> b.votes - a.votes).map(anecdote =>
                    <Anecdote anecdote={anecdote} key={anecdote.id} handleClick={() => {
                        dispatch(voteAnecdote(anecdote))
                        dispatch(setNotification(`You upvoted '${anecdote.content}'`, 5))
                    }} />
                )}
            </ul>
        </div>
    )
}

export default AnecdoteList