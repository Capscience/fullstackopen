import { useDispatch, useSelector } from "react-redux"
import Blog from "./Blog"
import { likeBlog } from "../reducers/blogReducer"
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
          deleteBlog={() => dispatch(setInfo("Deleting not yet implemented"))}
        />
      ))}
    </>
  )
}

export default BlogList;
