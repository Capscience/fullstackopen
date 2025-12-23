import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"
import { createAnecdote } from "../requests"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      notificationDispatch({ type: 'SET', payload: 'Failed to create anecdote, minimum length is 5 characters' })
      setTimeout(() => {
        notificationDispatch({ type: 'SET', payload: '' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({ type: 'SET', payload: `Created new anecdote '${content}'` })
    setTimeout(() => {
      notificationDispatch({ type: 'SET', payload: '' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
