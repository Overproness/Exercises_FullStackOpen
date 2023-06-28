import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action){
      const id = action.payload.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const votedAnecdote = {...anecdoteToVote, votes : anecdoteToVote.votes +1}
      return state.map(anecdote => anecdote.id === id ? votedAnecdote : anecdote)
    },
    setAnecdotes(state, action){
      return action.payload
    },
    appendAnecdotes(state, aciton){
      state.push(aciton.payload)
    }
  }
})


export const { updateAnecdote, setAnecdotes, appendAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdotes(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.update(anecdote)
    dispatch(updateAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer