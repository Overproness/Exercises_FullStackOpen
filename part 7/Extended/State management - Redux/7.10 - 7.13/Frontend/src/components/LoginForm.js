import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useState } from 'react'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')
  const handleLoginFormSubmit = async (event) => {
    event.preventDefault()
    dispatch(
      loginUser({
        username,
        password,
      })
    )
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
