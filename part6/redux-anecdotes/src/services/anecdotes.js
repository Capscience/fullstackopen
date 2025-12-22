const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}

const createNew = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 })
  }

  const response = await fetch(baseUrl, options)
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  return await response.json()
}

const addVote = async (anecdote) => {
  const options = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ votes: anecdote.votes + 1 })
  }

  const url = baseUrl + '/' + anecdote.id
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error('Failed to vote anecdote')
  }
  return await response.json()
}

export default { getAll, createNew, addVote }
