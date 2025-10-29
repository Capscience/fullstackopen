import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const blog = {
  title: 'The Joel Test: 12 Steps to Better Code',
  author: 'Joel Spolsky',
  url: 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/',
}

test('calls the callback function with correct data', async () => {
  const mockCallBack = vi.fn()
  render(<BlogForm addBlog={mockCallBack} />)
  // screen.debug()

  const userSession = userEvent.setup()
  const titleInput = screen.getByLabelText('Title:')
  const authorInput = screen.getByLabelText('Author:')
  const urlInput = screen.getByLabelText('URL:')
  const submitButton = screen.getByText('Save')

  await userSession.type(titleInput, blog.title)
  await userSession.type(authorInput, blog.author)
  await userSession.type(urlInput, blog.url)
  await userSession.click(submitButton)
  expect(mockCallBack.mock.calls[0][0].title).toBe(blog.title)
  expect(mockCallBack.mock.calls[0][0].author).toBe(blog.author)
  expect(mockCallBack.mock.calls[0][0].url).toBe(blog.url)
})
