import { useState } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "../reducers/userReducer";
import { setInfo, setError } from "../reducers/notificationReducer";

import loginService from "../services/login";
import blogService from "../services/blogs";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      dispatch(setUser(user));
      window.localStorage.setItem("blogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      dispatch(setInfo("Login succesful"));
    } catch (exception) {
      console.log(exception);
      dispatch(setError(exception.response.data.error));
    }
    console.log("logging in with", username, password);
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
