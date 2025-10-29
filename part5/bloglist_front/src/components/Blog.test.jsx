import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const user = {
  username: 'mluukkai',
  name: 'Matti Luukkainen'
}

const blog = {
  title: 'The Joel Test: 12 Steps to Better Code',
  author: 'Joel Spolsky',
  url: 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/',
  likes: 0,
  user
}

test('renders only title and author by default', () => {
  render(<Blog blog={blog} user={user} updateBlog={() => { }} deleteBlog={() => { }} />)
  // screen.debug()
  screen.getByText(`"${blog.title}"`)
  screen.getByText(`by ${blog.author}`)
  const url_element = screen.queryByText(blog.url)
  expect(url_element).toBeNull()
  const likes_element = screen.queryByText(`${blog.likes} likes`)
  expect(likes_element).toBeNull()
})

test('renders url, likes and poster when `show` has bee clicked', async () => {
  render(<Blog blog={blog} user={user} updateBlog={() => { }} deleteBlog={() => { }} />)
  const userSession = userEvent.setup()
  const showButton = screen.getByText('Show')
  await userSession.click(showButton)
  // screen.debug()
  screen.getByText(blog.url)
  screen.getByText(`${blog.likes} likes`, { exact: false })
  screen.getByText(`Posted by ${blog.user.name}`, { exact: false })
})

test('clicking like twice calls handler twice', async () => {
  const mockLikeHandler = vi.fn()
  render(<Blog blog={blog} user={user} updateBlog={mockLikeHandler} deleteBlog={() => { }} />)
  const userSession = userEvent.setup()
  const showButton = screen.getByText('Show')
  await userSession.click(showButton)
  const likeButton = screen.getByText('Like')
  await userSession.click(likeButton)
  await userSession.click(likeButton)
  expect(mockLikeHandler.mock.calls).toHaveLength(2)
})
