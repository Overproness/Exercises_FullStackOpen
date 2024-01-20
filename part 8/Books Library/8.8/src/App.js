import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App = () => {


  return (
    <div>
      <Router>
      <div>
        <Link className='p-x' to='/authors'>Authors</Link>
        <Link className='p-x' to='/Books'>Books</Link>
        <Link className='p-x' to='/Add Book'>Add Book</Link>
      </div>
      <Routes>
        <Route path='/authors' element={<Authors />}/>
        <Route path='/books' element={<Books />}/>
        <Route path='/new-book' element={<NewBook />}/>
      </Routes>
      </Router>
    </div>
  )
}

export default App
