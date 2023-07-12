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
    updateComments(state, action) {
      const { id } = action.payload
      const { comment } = action.payload
      const blogToUpdate = state.find((blog) => blog.id === id)
      const updatedBlog = {
        ...blogToUpdate,
        comments: blogToUpdate.comments.concat(comment),
      }
      return state.map((blog) => (blog.id === id ? updatedBlog : blog))
    },
  },
})

export const {
  setBlogs,
  appendBlogs,
  updateBlogs,
  removeBlog,
  updateComments,
} = blogSlice.actions

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
      dispatch(setNotification(exception.message, 5, exception.response.status))
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
      dispatch(setNotification(exception.message, 5, exception.response.status))
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
        dispatch(setNotification(error.message, 5, error.response.status))
      })
  }
}

export const addComment = (comment, id) => {
  return async (dispatch) => {
    try {
      const response = await blogService.addComment(comment, id)
      dispatch(updateComments({ id, comment: response }))
      dispatch(
        setNotification(
          `A new comment '${comment}' has been successfully added. `,
          5,
          200
        )
      )
    } catch (exception) {
      dispatch(setNotification(exception.message, 5, exception.response.status))
    }
  }
}

export default blogSlice.reducer
