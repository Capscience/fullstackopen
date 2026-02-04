import { useState } from "react";
import { useSelector } from "react-redux";

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const { user } = useSelector((state) => state);
  const [showAll, setShowAll] = useState(false);
  const toggle = () => setShowAll(!showAll);

  const handleLike = () => {
    updateBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    });
  };

  const handleDelete = () => {
    if (window.confirm(`Delete '${blog.title}'?`)) {
      deleteBlog(blog);
    }
  };

  return (
    <div className="blog">
      "{blog.title}"<br />
      <i>by {blog.author}</i>
      {showAll && (
        <>
          <br />
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
          <button onClick={toggle}>Hide</button>
          {user && blog.user && user.username === blog.user.username && (
            <button onClick={handleDelete} className="delete">
              Remove
            </button>
          )}
        </>
      )}
      {!showAll && (
        <>
          <br />
          <button onClick={toggle}>Show</button>
        </>
      )}
    </div>
  );
};

export default Blog;
