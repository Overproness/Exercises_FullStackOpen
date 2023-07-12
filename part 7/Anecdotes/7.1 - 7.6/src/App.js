import { useState } from 'react'
import Footer from './components/footer'
import AnecdoteList from './components/anecdoteList'
import CreateNew from './components/createNew'
import About from './components/about'
import { useMatch, Routes, Route, Link } from 'react-router-dom'
import Anecdote from './components/anecdote'
import Notification from './components/notification'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  // const anecdoteById = (id) =>
  //   anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }

  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

  const menuStyles = {
    padding: '5px'
  }

  return (
    <>
      <div>
        <Link style={menuStyles} to='/' >Anecdotes</Link>
        <Link style={menuStyles} to='/create-new'>Creat New</Link>
        <Link style={menuStyles} to='/about'>About</Link>
      </div>
      <Notification notification={notification} />
      <Routes>
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/create-new' element={<CreateNew addNew={addNew} anecdotes={anecdotes} setNotification={setNotification} />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
