import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  // Blog creation
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')


  const handleAddBlog = async (event) => {
    event.preventDefault()
    addBlog({ author, title, url })
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <>
      <h2>New blog</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            URL:
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  )
}

export default BlogForm
