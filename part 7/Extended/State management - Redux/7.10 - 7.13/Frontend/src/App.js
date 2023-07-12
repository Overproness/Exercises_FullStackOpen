import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import AdditionForm from './components/AdditionForm'
import LoginForm from './components/LoginForm'
import NotificationMsg from './components/NotificationMsg'
import LogoutForm from './components/Logout'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

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
    <>
      <LogoutForm user={user} />
      <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
        <AdditionForm />
      </Togglable>
      <NotificationMsg />
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog blog={blog} user={user} key={blog.id} />
        ))}
    </>
  )
}

export default App
