const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch('http://localhost:3001/anecdotes')
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  const anecdotes = await response.json()
  return anecdotes.sort((a, b) => b.votes - a.votes)
}

export const createAnecdote = async (newAnecdote) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote)
  }
  const response = await fetch(baseUrl, options)
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  return await response.json()
}

export const updateAnecdote = async (updatedAnecdote) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAnecdote),
  }
  const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, options)
  if (!response.ok) {
    throw new Error('Failed to update anecdote')
  }
  return await response.json()
}
