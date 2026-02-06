import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state
        .map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
        .sort((a, b) => b.likes - a.likes);
    },
    removeBlog(state, action) {
      const deletedBlog = action.payload;
      console.log(deletedBlog);
      return state.filter((blog) => blog.id !== deletedBlog.id);
    },
    setBlogs(_state, action) {
      return action.payload;
    },
  },
});

const { setBlogs, createBlog, updateBlog, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  };
};

export const appendBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(createBlog(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(blog);
    dispatch(updateBlog(likedBlog));
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog);
    dispatch(removeBlog(blog));
  };
};

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    const newComment = await blogService.addComment(blog, comment);
    dispatch(
      updateBlog({
        ...blog,
        comments: blog.comments.concat(newComment),
      }),
    );
  };
};

export default blogSlice.reducer;
