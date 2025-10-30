const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')
const { before } = require('node:test')

const user = {
  name: 'Matti Luukkainen',
  username: 'mluukkai',
  password: 'salainen',
}

const otherUser = {
  name: 'Other User',
  username: 'other',
  password: 'secret',
}

const blog = {
  title: 'Blog created by Playwright',
  author: 'Playwright',
  url: 'https://example.com',
}

describe('Bloglist app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: user
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Blogs')).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })

  test('blogs are shown orderd by likes', async ({ page }) => {
    // Helper function to give each blog their number of likes
    const nLikesToBlogN = async (page, n) => {
      const blogDiv = await page
        .getByText(`"Blog ${n}"`)
      const likeButton = await blogDiv
        .getByRole('button', { name: 'Like' })
      for (var i = 0; i < n; i++) {
        await likeButton.click()
        await expect(blogDiv.getByText(`${i + 1} likes`)).toBeVisible()
      }
    }
    await loginWith(page, user)
    // Create blogs 1-3 and give them likes
    for (const i of [1, 2, 3]) {
      await createBlog(page, { title: `Blog ${i}`, author: blog.author, url: blog.url })
      await page.getByRole('button', { name: 'Show' }).click()
      await nLikesToBlogN(page, i)
    }

    // Make sure that order is correct
    await expect(page.getByText('"Blog').first().getByText('3 likes')).toBeVisible()
    await expect(page.getByText('"Blog').nth(1).getByText('2 likes')).toBeVisible()
    await expect(page.getByText('"Blog').nth(2).getByText('1 likes')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, user)
      await expect(page.getByText(`Logged in as ${user.name}`)).toBeVisible()
    })

    test('fails with invalid credentials', async ({ page }) => {
      await loginWith(page, { username: 'mluukkai', password: 'wrong' })
      await expect(page.getByText('invalid username or password')).toBeVisible()
      await expect(page.getByText(`Logged in as ${user.name}`)).not.toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('/api/users', { data: otherUser })
      await loginWith(page, user)
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, blog)
      await expect(page.getByText('Added blog \'Blog created by Playwright\' by Playwright')).toBeVisible()
      await expect(page.getByText('"Blog created by Playwright"')).toBeVisible()
    })

    test('created blog can be removed by the adder', async ({ page }) => {
      page.on('dialog', dialog => dialog.accept())
      await createBlog(page, blog)
      await page.getByRole('button', { name: 'Show' }).click()
      await page.getByRole('button', { name: 'Remove' }).click()
      await expect(page.getByText('"Blog created by Playwright"')).not.toBeVisible()
    })

    test('blogs added by others cannot be removed', async ({ page }) => {
      await createBlog(page, blog)
      await page.getByRole('button', { name: 'Logout' }).click()
      await loginWith(page, otherUser)
      await page.getByRole('button', { name: 'Show' }).click()
      await expect(page.getByRole('button', { name: 'Remove' })).not.toBeVisible()
    })
  })

  describe('without logging in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, user)
      await createBlog(page, blog)
      await page.getByRole('button', { name: 'Logout' }).click()
    })

    test('blogs can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'Show' }).click()
      await expect(page.getByText('0 likes')).toBeVisible()

      await page.getByRole('button', { name: 'Like' }).click()
      await page.getByRole('button', { name: 'Like' }).click()
      await expect(page.getByText('2 likes')).toBeVisible()
      // Make sure the name of the user is still visible, as that wasn't always the case earlier
      await expect(page.getByText(`Posted by ${user.name}`)).toBeVisible()
    })

    test('the `Remove` button is not shown', async ({ page }) => {
      await page.getByRole('button', { name: 'Show' }).click()
      await expect(page.getByText('Remove')).not.toBeVisible()
    })
  })
})
