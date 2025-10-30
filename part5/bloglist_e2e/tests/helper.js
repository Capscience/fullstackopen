const loginWith = async (page, user) => {
  await page.getByLabel('username').fill(user.username)
  await page.getByLabel('password').fill(user.password)
  await page.getByRole('button', { name: 'Login' }).click()
}

const createBlog = async (page, blog) => {
  await page.getByRole('button', { name: 'Add new blog' }).click()
  await page.getByLabel('Title:').fill(blog.title)
  await page.getByLabel('Author').fill(blog.author)
  await page.getByLabel('URL:').fill(blog.url)
  await page.getByRole('button', { name: 'Save' }).click()
}

export { loginWith, createBlog }
