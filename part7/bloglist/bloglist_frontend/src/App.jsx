import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";

import { setInfo } from "./reducers/notificationReducer";
import { setUser } from "./reducers/loginReducer";

import blogService from "./services/blogs";
import "./index.css";

import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  useEffect(() => {
    const blogAppUser = window.localStorage.getItem("blogAppUser");
    if (blogAppUser) {
      const user = JSON.parse(blogAppUser);
      blogService.setToken(user.token);
      dispatch(setUser(user));
      console.log(`Logged in cached ${user.username} from local storage`)
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

  return (
    <div className="container">
      {user && (
        <>
          <p>Logged in as {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      <div>
        <Link to="/">Blogs</Link>
        <Link to="/users">Users</Link>
      </div>

      <h1>Blogs</h1>
      <Notification />

      {!user && <LoginForm />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>

    </div>
  );
};

export default App;
