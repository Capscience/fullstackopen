import { useDispatch, useSelector } from "react-redux"
import Blog from "./Blog"
import { likeBlog, deleteBlog } from "../reducers/blogReducer"
import { setInfo } from "../reducers/notificationReducer"

const BlogList = ({ user }) => {
  const { blogs } = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateBlog={blog => dispatch(likeBlog(blog))}
          deleteBlog={blog => {
            dispatch(deleteBlog(blog))
            dispatch(setInfo(`Deleted blog ${blog.title}`))
          }}
        />
      ))}
    </>
  )
}

export default BlogList;
