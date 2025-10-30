import { useState } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [showAll, setShowAll] = useState(false)
  const toggle = () => setShowAll(!showAll)
  const handleLike = () => {
    updateBlog({ id: blog.id, title: blog.title, author: blog.author, url: blog.url, likes: ++blog.likes, user: blog.user.id })
  }
  const handleDelete = () => {
    if (window.confirm(`Delete '${blog.title}'?`)) {
      deleteBlog(blog)
    }
  }
  return (
    <div className='blog'>
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
          {user && blog.user && user.username === blog.user.username && (<button onClick={handleDelete} className='delete'>Remove</button>)}
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
