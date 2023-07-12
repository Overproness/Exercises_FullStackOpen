import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const LogoutForm = (props) => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutUser())
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
