import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "../reducers/userReducer";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state);
  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch])
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td style={{ textAlign: 'center' }}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default UsersPage;
