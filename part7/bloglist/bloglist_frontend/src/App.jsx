import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { setInfo, setError } from "./reducers/notificationReducer";

import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const blogAppUser = window.localStorage.getItem("blogAppUser");
    if (blogAppUser) {
      const user = JSON.parse(blogAppUser);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const addBlog = async (newBlog) => {
    try {
      const addedBlog = await blogService.create(newBlog);
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(addedBlog));
      dispatch(
        setInfo(`Added blog '${addedBlog.title}' by ${addedBlog.author}`),
      );
    } catch (exception) {
      console.log(exception);
      dispatch(setError(exception.response.data.error));
    }
  };

  const updateBlog = async (newData) => {
    try {
      await blogService.update(newData);
      const newBlogs = await blogService.getAll();
      newBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(newBlogs);
    } catch (exception) {
      console.log(exception);
      dispatch(setError(exception.response.data.error));
    }
  };

  const deleteBlog = async (blog) => {
    try {
      await blogService.deleteBlog(blog);
      const newBlogs = await blogService.getAll();
      newBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(newBlogs);
    } catch (exception) {
      console.log(exception);
      dispatch(setError(exception.response.data.error));
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("blogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      dispatch(setInfo("Login succesful"));
    } catch (exception) {
      console.log(exception);
      dispatch(setError(exception.response.data.error));
    }
    console.log("logging in with", username, password);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("blogAppUser");
    blogService.setToken(null);
    setUser(null);
    console.log("Logged out");
    dispatch(setInfo("Logged out"));
  };

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

      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      )}

      {user && (
        <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>
      )}

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  );
};

export default App;
