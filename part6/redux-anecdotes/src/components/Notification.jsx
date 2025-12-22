import { useDispatch, useSelector } from "react-redux"
import { clearNotification } from "../reducers/notificationReducer"
const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }
  const { notification } = useSelector(state => state)
  const dispatch = useDispatch()

  return notification
    ? (<div style={style}>
      <p>{notification}</p>
      <button onClick={() => dispatch(clearNotification())}>
        Clear
      </button>
    </div>
    )
    : (<></>)
}

export default Notification
