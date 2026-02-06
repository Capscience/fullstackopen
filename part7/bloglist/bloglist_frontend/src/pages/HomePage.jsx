import { useRef } from "react";
import { useSelector } from "react-redux";
import BlogList from "../components/BlogList";
import BlogForm from "../components/BlogForm";
import Togglable from "../components/Togglable";

const HomePage = () => {
  const { user } = useSelector(state => state);
  const blogFormRef = useRef();
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
