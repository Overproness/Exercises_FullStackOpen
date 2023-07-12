import { useEffect, useState, useRef } from 'react'
import AdditionForm from './components/AdditionForm'
import LoginForm from './components/LoginForm'
import NotificationMsg from './components/NotificationMsg'
import LogoutForm from './components/Logout'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import IndiviualUser from './components/IndiviualUser'
import Blogs from './components/Blogs'
import IndiviualBlog from './components/IndiviualBlog'
import { AppBar, Button, Container, Toolbar } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [users, setUsers] = useState([])

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  const blogFormRef = useRef()

  if (!user) {
    return (
      <>
        <Togglable buttonLabel="Login">
          <LoginForm />
        </Togglable>

        <NotificationMsg />
      </>
    )
  }

  return (
    <Container>
      <Router>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/">
                Blogs
              </Button>
              <Button color="inherit" component={Link} to="/users">
                Users
              </Button>
            </Toolbar>
          </AppBar>
          <LogoutForm user={user} />
          <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
            <AdditionForm />
          </Togglable>
          <NotificationMsg />
        </div>

        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route
            path="/users"
            element={<Users setUsers={setUsers} users={users} />}
          />
          <Route path="/users/:id" element={<IndiviualUser users={users} />} />
          <Route path="/blogs/:id" element={<IndiviualBlog />} />
        </Routes>
      </Router>
    </Container>
  )
}

export default App
