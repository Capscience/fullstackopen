import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { initializeUsers } from "../reducers/userReducer";

const SingleUserPage = () => {
  const dispatch = useDispatch();
  const { user, users } = useSelector(state => state);

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const match = useMatch("/users/:id")
  const foundUser = match
    ? users.find((user) => user.id === match.params.id)
    : null;

  if (!user || !foundUser) {
    return null;
  }
  return (
    <>
      <h2>{foundUser.name}</h2>
      <h3>Blogs:</h3>
      <ul>
        {foundUser.blogs.map(blog => (
          <li key={blog.id}> {blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default SingleUserPage;
