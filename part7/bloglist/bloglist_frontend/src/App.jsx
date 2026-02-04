import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setInfo } from "./reducers/notificationReducer";
import { setUser } from "./reducers/userReducer";

import blogService from "./services/blogs";
import "./index.css";

import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const blogAppUser = window.localStorage.getItem("blogAppUser");
    if (blogAppUser) {
      const user = JSON.parse(blogAppUser);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("blogAppUser");
    blogService.setToken(null);
    dispatch(setUser(null));
    console.log("Logged out");
    dispatch(setInfo("Logged out"));
  };
  console.log(user);

  return (
    <div className="container">
      {user && (
        <>
          <p>Logged in as {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      <h1>Blogs</h1>
      <Notification />

      {!user && <LoginForm />}

      {user && (
        <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
          <BlogForm />
        </Togglable>
      )}

      <BlogList />
    </div>
  );
};

export default App;
