import { useState } from 'react'
import Togglable from './Togglable'

const blogStyle = {
  borderWidth: 1,
  border: 'solid',
  borderRadius: 10,
  padding: 10,
  marginTop: 5
}

const deleteButtonStyle = {
  marginLeft: 5,
  background: 'red',
  borderColor: 'red',
}

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [showAll, setShowAll] = useState(false)
  const toggle = () => setShowAll(!showAll)
  const handleLike = () => {
    blog.likes++
    updateBlog(blog)
  }
  const handleDelete = () => {
    if (window.confirm(`Delete '${blog.title}'?`)) {
      deleteBlog(blog)
    }
  }
  return (
    <div style={blogStyle}>
      "{blog.title}"<br />
      <i>by {blog.author}</i>
      {showAll && (
        <>
          <br />
          <a href={blog.url}>{blog.url}</a><br />
          {blog.likes} likes
          <button onClick={handleLike}>Like</button><br />
          {blog.user && (<>Posted by {blog.user.name}<br /></>)}
          <button onClick={toggle}>Hide</button>
          {blog.user && user.username === blog.user.username && (<button onClick={handleDelete} style={deleteButtonStyle}>Remove</button>)}
        </>
      )}
      {!showAll && (
        <>
          <br />
          <button onClick={toggle}>Show</button>
        </>
      )}
    </div >
  )
}


export default Blog
