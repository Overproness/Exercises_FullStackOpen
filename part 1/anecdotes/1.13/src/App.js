import { useState } from 'react'


const Display = (props) => (
  <>
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  </>
)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  const length = anecdotes.length
  const [points, setPoints] = useState(Array(length).fill(0))

  
  const randInt = (max) => (Math.floor(Math.random() * max))

  const handleClickNext = () => {
    const newNextClick = randInt(7)
    setSelected(newNextClick)
  }

  const handleClickVote = () => {
    const newVoteValue = [...points]
    newVoteValue[selected] +=1
    setPoints(newVoteValue)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Display handleClick={() => handleClickVote()} text='Vote' />
      <Display handleClick={() => handleClickNext()} text='Next Anecdote' />
    </div>
  )
}

export default App