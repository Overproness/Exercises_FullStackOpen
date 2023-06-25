const LogoutForm = props => (
  <>
    <p>{props.user.name} logged in<button onClick={props.handleLogout}>Logout</button></p>
  </>
)

export default LogoutForm