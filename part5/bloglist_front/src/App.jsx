import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // Notifications
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const notify = newMessage => {
    setMessage(newMessage)
    setIsError(false)
    setTimeout(() => {
      setMessage(null)
    }, 3500)
  }
  const errorMessage = newMessage => {
    setMessage(newMessage)
    setIsError(true)
    setTimeout(() => {
      setMessage(null)
    }, 3500)
  }



  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const blogAppUser = window.localStorage.getItem('blogAppUser')
    if (blogAppUser) {
      const user = JSON.parse(blogAppUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const addBlog = async newBlog => {
    try {
      const addedBlog = await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(addedBlog))
      notify(`Added blog '${addedBlog.title}' by ${addedBlog.author}`)
    } catch (exception) {
      console.log(exception)
      errorMessage(exception.response.data.error)
    }
  }

  const updateBlog = async newData => {
    try {
      const blogUser = newData.user
      newData.user = blogUser.id
      await blogService.update(newData)
      const newBlogs = await blogService.getAll()
      newBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(newBlogs)
    } catch (exception) {
      console.log(exception)
      errorMessage(exception.response.data.error)
    }
  }

  const deleteBlog = async blog => {
    try {
      await blogService.deleteBlog(blog)
      const newBlogs = await blogService.getAll()
      newBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(newBlogs)
    } catch (exception) {
      console.log(exception)
      errorMessage(exception.response.data.error)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('blogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notify('Login succesful')
    } catch (exception) {
      console.log(exception)
      errorMessage(exception.response.data.error)
    }
    console.log('logging in with', username, password)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('blogAppUser')
    blogService.setToken(null)
    setUser(null)
    console.log('Logged out')
    notify('Logged out')
  }

  return (
    <div className='container'>
      {user && (
        <>
          <p>Logged in as {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      <h1>Blogs</h1>
      <Notification message={message} isError={isError} />

      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      )}

      {user && (
        <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>
      )}


      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default App
