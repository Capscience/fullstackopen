import { useState } from "react";
import { useDispatch } from "react-redux";
import { commentBlog } from "../reducers/blogReducer";

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('')
  const submit = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, { content }))
    setContent('')
  }
  return (
    <form onSubmit={submit}>
      <input type="text" value={content} onChange={({ target }) => setContent(target.value)} />
      <button type="submit">Add comment</button>

    </form>
  )
}

export default CommentForm;
