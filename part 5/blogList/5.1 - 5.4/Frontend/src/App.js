import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import AdditionForm from './components/AdditionForm'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import NotificationMsg from './components/NotificationMsg'
import LogoutForm from './components/Logout'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser]=useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorCode, setErrorCode] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const titleChange = event =>{
    setTitle(event.target.value)
  }

  const authorChange = event =>{
    setAuthor(event.target.value)
  }

  const urlChange = event => {
    setUrl(event.target.value)
  }

  const handleAdditionFormSubmit = event => {
    event.preventDefault()
    const body ={
      title,
      author,
      url
    }
    blogService.create(body)
      .then(response => {
        setTitle('')
        setAuthor('')
        setUrl('')
        setErrorMessage('Blog has been added successfully')
        setErrorCode(201)
        setTimeout(() => {
          setErrorMessage(null)
          setErrorCode(null)
        }, 5000);
      })
      .catch(error =>{
        setErrorMessage(error.message)
        setErrorCode(400)
        setTimeout(() => {
          setErrorMessage(null)
          setErrorCode(null)
        }, 5000);
      })
  }

  const handleLoginFormSubmit =async event =>{
    event.preventDefault()

    try{
      const user= await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception){
      setErrorMessage('Wrong Credentials')
      setErrorCode(401)
      setTimeout(()=>{
        setErrorMessage(null)
        setErrorCode(null)
      }, 5000)
    }
  }

  const usernameChange = event=>{
    setUsername(event.target.value)
  }

  const passwordChange= event=>{
    setPassword(event.target.value)
  }

  const handleLogout = event =>{
    window.localStorage.removeItem('loggedBlogappUser')
  }

  if(!user){
    return(
    <>
      <LoginForm username={username} password={password} handleLoginFormSubmit={handleLoginFormSubmit} usernameChange={usernameChange} passwordChange={passwordChange} /> 
    </>
  )}
  return (
    <>
      <LogoutForm user={user} handleLogout={handleLogout} />
      <AdditionForm title={title} author={author} url={url} titleChange={titleChange} authorChange={authorChange} urlChange={urlChange} handleAdditionFormSubmit={handleAdditionFormSubmit}  />
      <NotificationMsg errorCode={errorCode} errorMessage={errorMessage} />
      <Blog blogs={blogs} />
    </>
  )
}

export default App