import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'

import blogService from './services/blogs'
import AdditionForm from './components/AdditionForm'

import LoginForm from './components/LoginForm'

import loginService from './services/login'

import NotificationMsg from './components/NotificationMsg'

import LogoutForm from './components/Logout'

import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)

  const [errorCode, setErrorCode] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setUser(user)

      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const addBlog = (newObject) => {
    blogFormRef.current.toggleVisibility()

    blogService

      .create(newObject)

      .then((response) => {
        setBlogs(blogs.concat(response))

        setErrorMessage('Blog has been added successfully')

        setErrorCode(201)

        setTimeout(() => {
          setErrorMessage(null)

          setErrorCode(null)
        }, 5000)
      })

      .catch((error) => {
        setErrorMessage(error.message)

        setErrorCode(400)

        setTimeout(() => {
          setErrorMessage(null)

          setErrorCode(null)
        }, 5000)
      })
  }

  const updateLikes = (newObject, id) => {
    blogService

      .update(newObject, id)

      .then((updatedBlog) => {
        const newBlogs = blogs.map((blog) =>
          blog.id === id ? updatedBlog : blog
        )

        setBlogs(newBlogs)
      })

      .catch((error) => {
        setErrorMessage(error.message)

        setErrorCode(400)

        setTimeout(() => {
          setErrorMessage(null)

          setErrorCode(null)
        }, 5000)
      })
  }

  const blogDeleter = (id) => {
    blogService

      .remove(id)

      .then(() => {
        const newBlogs = blogs.filter((blog) => blog.id !== id)

        setBlogs(newBlogs)

        setErrorMessage('Blog has been deleted successfully')

        setErrorCode(201)

        setTimeout(() => {
          setErrorMessage(null)

          setErrorCode(null)
        }, 5000)
      })

      .catch((error) => {
        setErrorMessage(error.message)

        setErrorCode(400)

        setTimeout(() => {
          setErrorMessage(null)

          setErrorCode(null)
        }, 5000)
      })
  }

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,

        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)

      setUser(user)

      setUsername('')

      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong Credentials')

      setErrorCode(401)

      setTimeout(() => {
        setErrorMessage(null)

        setErrorCode(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const blogFormRef = useRef()

  if (!user) {
    return (
      <>
        <Togglable buttonLabel="Login">
          <LoginForm
            username={username}
            password={password}
            handleLoginFormSubmit={handleLoginFormSubmit}
            usernameChange={(event) => setUsername(event.target.value)}
            passwordChange={(event) => setPassword(event.target.value)}
          />
        </Togglable>

        <NotificationMsg errorCode={errorCode} errorMessage={errorMessage} />
      </>
    )
  }

  return (
    <>
      <LogoutForm user={user} handleLogout={handleLogout} />

      <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
        <AdditionForm createBlog={addBlog} />
      </Togglable>

      <NotificationMsg errorCode={errorCode} errorMessage={errorMessage} />

      {blogs

        .sort((a, b) => b.likes - a.likes)

        .map((blog) => (
          <Blog
            blog={blog}
            user={user}
            likesUpdater={updateLikes}
            blogDeleter={blogDeleter}
            key={blog.id}
          />
        ))}
    </>
  )
}

export default App
