import PropTypes from 'prop-types'

const LoginForm = (props) => (
  <>
    <h2>Login</h2>
    <form onSubmit={props.handleLoginFormSubmit}>
      <p>username: <input value={props.username} type="text" onChange={props.usernameChange} name="Username" /></p>
      <p>password: <input value={props.password} onChange={props.passwordChange} type="password" name="Password" /></p>
      <button type="submit">Login</button>
    </form>
  </>
)

LoginForm.propTypes = {
  handleLoginFormSubmit: PropTypes.func.isRequired,
  usernameChange: PropTypes.func.isRequired,
  passwordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm