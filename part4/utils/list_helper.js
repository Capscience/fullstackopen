const _ = require('lodash')

const dummy = (_blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => {
      return sum + blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
  return _.maxBy(blogs, item => item.likes)
  // if (blogs.length === 0) {
  //   return null
  // }
  //
  // return blogs.reduce((current_favourite, blog) => {
  //   return blog.likes > current_favourite.likes
  //     ? blog
  //     : current_favourite
  // })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  const counts = _.countBy(blogs, blog => blog.author)
  const [author, blogCount] = _.maxBy(_.toPairs(counts), pair => pair[1])
  return { author, blogs: blogCount }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  const grouped = _.groupBy(blogs, blog => blog.author)
  const authorLikes = _.mapValues(grouped, authorBlogs => {
    return totalLikes(authorBlogs)
  })
  const [author, likes] = _.maxBy(_.toPairs(authorLikes), pair => pair[1])
  return { author, likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
