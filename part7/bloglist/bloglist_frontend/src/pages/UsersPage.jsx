import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "../reducers/userReducer";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { user, users } = useSelector(state => state);
  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch])
  return user ? (
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
            <tr>
              <td>{user.name}</td>
              <td style={{ textAlign: 'center' }}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : null;
}

export default UsersPage;
