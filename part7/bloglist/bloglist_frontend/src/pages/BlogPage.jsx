import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { likeBlog, deleteBlog, initializeBlogs } from "../reducers/blogReducer";
import { setError, setInfo } from "../reducers/notificationReducer";

const BlogPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, blogs } = useSelector(state => state);

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const match = useMatch("/blogs/:id")
  const blog = match
    ? blogs.find((blog) => blog.id === match.params.id)
    : null;

  if (!blog) {
    dispatch(setError("Blog not found!"))
    navigate("/")
  }

  const handleLike = () => {
    console.log("Liking blog")
    dispatch(likeBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }));
  };

  const handleDelete = () => {
    if (window.confirm(`Delete '${blog.title}'?`)) {
      dispatch(deleteBlog(blog));
      dispatch(setInfo("Blog deleted!"))
      navigate("/")
    }
  };

  if (!user || !blog) {
    return null;
  }
  return (
    <>
      <h2>{blog.title}</h2>

      <a href={blog.url}>{blog.url}</a>
      <br />
      {blog.likes} likes
      <button onClick={handleLike}>Like</button>
      <br />
      {blog.user && (
        <>
          Posted by {blog.user.name}
          <br />
        </>
      )}
      {user && blog.user && user.username === blog.user.username && (
        <button onClick={handleDelete} className="delete">
          Remove
        </button>
      )}
    </>
  )
}

export default BlogPage;
