import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import AdditionForm from './components/AdditionForm'
import LoginForm from './components/LoginForm'
import NotificationMsg from './components/NotificationMsg'
import LogoutForm from './components/Logout'
import Togglable from './components/Togglable'
import { useQuery } from 'react-query'
import { getAll } from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const result = useQuery('blogs', getAll, {
    refetchOnWindowFocus: false,
    retry: 1,
  })
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setUser(user)

      blogService.setToken(user.token)
    }
  }, [])

  const blogs = result.data

  // if (result.isLoading) {
  //   return (
  //     <div>
  //       <p>Loading...</p>
  //     </div>
  //   )
  // } else if (result.isError) {
  //   return (
  //     <div>
  //       <p>Blog Service is not available due to server issues. </p>
  //     </div>
  //   )
  // }

  const blogFormRef = useRef()

  if (!user) {
    return (
      <>
        <Togglable buttonLabel="Login">
          <LoginForm setUser={setUser} />
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

      {blogs &&
        [...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => <Blog blog={blog} user={user} key={blog.id} />)}
    </>
  )
}

export default App
