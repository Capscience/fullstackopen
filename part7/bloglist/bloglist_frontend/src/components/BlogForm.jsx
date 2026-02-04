import { useState } from "react";
import { useDispatch } from "react-redux";
import { appendBlog } from "../reducers/blogReducer"

const BlogForm = () => {
  const dispatch = useDispatch()

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    dispatch(
      appendBlog({
        author,
        title,
        url,
      })
    );
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <>
      <h2>New blog</h2>
      <form onSubmit={addBlog} name="blog-form">
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
  );
};

export default BlogForm;
