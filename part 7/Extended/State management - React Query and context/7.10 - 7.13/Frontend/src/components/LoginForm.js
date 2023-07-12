import { useState } from 'react'
import { useMutation } from 'react-query'
import { login } from '../services/login'
import blogService from '../services/blogs'
import { useNotificationDispatcher } from '../notificationContext'
import { useStatusCodeDispatcher } from '../statusCodeContext'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const notificationDispatcher = useNotificationDispatcher()
  const statusCodeDispatcher = useStatusCodeDispatcher()
  const reload = () => {
    window.location.reload(false)
  }

  const loginUserMutation = useMutation(login, {
    onSuccess: (user) => {
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(
        window.localStorage.getItem('loggedBlogappUser').token
      )
      props.setUser(window.localStorage.getItem('loggedBlogappUser'))
      reload()
    },
    onError: (error) => {
      notificationDispatcher({
        type: 'ERR',
        payload: error.message,
      })
      statusCodeDispatcher({
        type: 'SET',
        payload: 401,
      })
      setTimeout(() => {
        notificationDispatcher({
          type: 'RESET',
        })
        statusCodeDispatcher({
          type: 'RESET',
        })
      }, 5000)
    },
  })

  const handleLoginFormSubmit = (event) => {
    event.preventDefault()
    loginUserMutation.mutate({
      username,
      password,
    })

    setUsername('')
    setPassword('')
  }
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLoginFormSubmit}>
        <p>
          username:{' '}
          <input
            value={username}
            type="text"
            onChange={(event) => setUsername(event.target.value)}
            name="Username"
            id={'username'}
          />
        </p>
        <p>
          password:{' '}
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            name="Password"
            id="password"
          />
        </p>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </>
  )
}

export default LoginForm
