const LogoutForm = (props) => {
  const reload = () => {
    window.location.reload(false)
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    reload()
  }

  return (
    <>
      <p>
        {props.user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
    </>
  )
}

export default LogoutForm
