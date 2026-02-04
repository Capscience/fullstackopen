import { useDispatch } from "react-redux";
import { appendBlog } from "../reducers/blogReducer"

const BlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault();
    dispatch(
      appendBlog({
        author: event.target.author.value,
        title: event.target.title.value,
        url: event.target.url.value
      })
    );
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
              name="title"
            />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              type="text"
              name="author"
            />
          </label>
        </div>
        <div>
          <label>
            URL:
            <input
              type="text"
              name="url"
            />
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default BlogForm;
