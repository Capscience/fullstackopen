import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, clickHandler }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={clickHandler}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const { anecdotes, filter } = useSelector(state => state)

  const dispatch = useDispatch()

  return (
    <>
      {anecdotes.filter(anecdote => {
        if (filter) {
          return anecdote.content.toLowerCase().includes(filter.toLowerCase())
        } else {
          return true
        }
      }).map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          clickHandler={
            () => {
              dispatch(voteAnecdote(anecdote.id))
              dispatch(setNotification(`Voted anecdote '${anecdote.content}'`))
              setTimeout(() => {
                dispatch(clearNotification())
              }, 5000)
            }
          }
        />
      ))}
    </>
  )
}

export default AnecdoteList
