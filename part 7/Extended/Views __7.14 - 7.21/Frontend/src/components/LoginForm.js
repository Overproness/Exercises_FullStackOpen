import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useState } from 'react'
import { Button, TextField } from '@mui/material'

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
        <div>
          username:{' '}
          <TextField
            value={username}
            type="text"
            onChange={(event) => setUsername(event.target.value)}
            name="Username"
            id={'username'}
            label="username"
          />
        </div>
        <div>
          password:{' '}
          <TextField
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            name="Password"
            id="password"
            label="password"
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          id="login-button"
          type="submit"
        >
          Login
        </Button>
      </form>
    </>
  )
}

export default LoginForm
