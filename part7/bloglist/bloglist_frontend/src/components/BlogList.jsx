import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import { likeBlog, deleteBlog, initializeBlogs } from "../reducers/blogReducer";
import { setInfo } from "../reducers/notificationReducer";
import { useEffect } from "react";

const BlogList = ({ user }) => {
  const { blogs } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(initializeBlogs());
    }
    console.log("rerender")
  }, [blogs, dispatch]);


  return (
    <>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateBlog={(blog) => dispatch(likeBlog(blog))}
          deleteBlog={(blog) => {
            dispatch(deleteBlog(blog));
            dispatch(setInfo(`Deleted blog ${blog.title}`));
          }}
        />
      ))}
    </>
  );
};

export default BlogList;
