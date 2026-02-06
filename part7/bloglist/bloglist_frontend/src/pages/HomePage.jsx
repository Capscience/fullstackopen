import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "../components/BlogList";
import BlogForm from "../components/BlogForm";
import Togglable from "../components/Togglable";
import { initializeBlogs } from "../reducers/blogReducer";

const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);


  return (
    <>
      {user && (
        <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
          <BlogForm />
        </Togglable>
      )}
      <BlogList />
    </>
  );
}

export default HomePage;
