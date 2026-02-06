import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { likeBlog, deleteBlog, initializeBlogs } from "../reducers/blogReducer";
import { setInfo } from "../reducers/notificationReducer";

const BlogPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, blogs } = useSelector(state => state);

  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(initializeBlogs())
    }
  }, [blogs.length, dispatch])

  const match = useMatch("/blogs/:id")
  const blog = match
    ? blogs.find((blog) => blog.id === match.params.id)
    : null;

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

  return blog ? (
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
      {blog.comments.length !== 0 && (
        <>
          <h3>Comments</h3>
          <ul>
            {blog.comments.map(comment => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        </>
      )}
    </>
  ) : null;
}

export default BlogPage;
