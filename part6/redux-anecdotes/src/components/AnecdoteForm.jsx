import { useDispatch } from "react-redux"
import { appendAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async event => {
    event.preventDefault()
    dispatch(appendAnecdote(event.target.anecdote.value))
    dispatch(setNotification(`Added anecdote '${event.target.anecdote.value}'`, 5))
    event.target.anecdote.value = ''
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
