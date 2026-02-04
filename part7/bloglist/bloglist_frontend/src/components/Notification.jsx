import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const { notification } = useSelector((state) => state);
  const dispatch = useDispatch();
  if (!notification.message) {
    return null;
  }

  return (
    <div className={notification.isError ? "error" : "info"}>
      <p>{notification.message}</p>
      <button onClick={() => dispatch(clearNotification())}>Clear</button>
    </div>
  );
};

export default Notification;
