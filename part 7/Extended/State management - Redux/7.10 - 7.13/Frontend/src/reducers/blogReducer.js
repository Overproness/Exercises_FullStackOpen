import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlogs(state, action) {
      state.push(action.payload)
    },
    updateBlogs(state, action) {
      const id = action.payload.id
      const blogToLike = state.find((blog) => blog.id === id)
      const updatedBlog = { ...blogToLike, likes: blogToLike.likes + 1 }
      return state.map((blog) => (blog.id === id ? updatedBlog : blog))
    },
    removeBlog(state, action) {
      const id = action.payload.id
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const { setBlogs, appendBlogs, updateBlogs, removeBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(newObject)
      dispatch(setNotification('A new blog has been added. ', 5, 200))
      dispatch(appendBlogs(newBlog))
    } catch (exception) {
      console.log(
        '🚀 ~ file: blogReducer.js:40 ~ return ~ exception:',
        exception
      )
      dispatch(setNotification(exception, 5, 400))
    }
  }
}

export const likeBlogs = (newObject, id) => {
  return async (dispatch) => {
    try {
      const response = await blogService.update(newObject, id)
      dispatch(updateBlogs(response))
      dispatch(
        setNotification(`You liked the blog '${newObject.title}'`, 5, 200)
      )
    } catch (exception) {
      dispatch(setNotification(exception, 5, 400))
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    blogService
      .remove(id)
      .then(() => {
        dispatch(removeBlog({ id }))
        dispatch(setNotification('Blog has been deleted', 5, 201))
      })
      .catch((error) => {
        dispatch(setNotification(error.message, 5, 400))
      })
  }
}

export default blogSlice.reducer
