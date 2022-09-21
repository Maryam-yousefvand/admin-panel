// import { api } from '../api'
import axios from '../api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const login = createAsyncThunk(
  'auth/login',
  async ({ values, navigate }) => {
    try {
      const response = await axios.post('/login/create', values)
      navigate('/dashboard/admin')
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
)

export const register = createAsyncThunk(
  'auth/register',
  async ({ values, navigate }) => {
    try {
      const response = await axios.post('/register/create', values)
      navigate('/login')
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
)

export const userList = createAsyncThunk('auth/userList', async () => {
  try {
    const response = await axios.get('/register')

    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const deleteUser = createAsyncThunk('auth/deleteUser', async (_id) => {
  try {
    const response = await axios.delete(`/register/delete/${_id}`)
    // console.log(response.data.msg._id)
    return response.data.msg._id
  } catch (error) {
    console.log(error)
  }
})

export const editUser = createAsyncThunk(
  'auth/editUser',
  async ({ _id, name, fullname, email }) => {
    try {
      const response = await axios.put(`/register/update/${_id}`, {
        _id,
        name,
        fullname,
        email,
      })

      return response.data
    } catch (error) {
      console.log(error)
    }
  },
)

// export const deleteUser = createAsyncThunk('auth/userDelete', async (_id) => {
//   try {
//     console.log(_id)
//     await axios.delete(`/register/delete/${_id}`)
//   } catch (error) {
//     console.log(error.response)
//   }
// })

const initialState = {
  user: null,
  error: '',
  loading: false,
  isLogin: false,
  users: [],
  deleteUser: {},
  edit: {},
}

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    logoutUser(state, action) {
      localStorage.removeItem('profile')
      // state.user = null
      state.error = ''
      state.loading = false
      state.isLogin = false
    },
  },

  extraReducers: {
    [register.pending]: (state, action) => {
      state.loading = true
    },

    [register.fulfilled]: (state, action) => {
      state.loading = false

      // const now = new Date()
      // const day = now.getDate()
      // const full_year = now.getFullYear()
      // const month = now.getMonth()
      // state.createdAt = `${day} / ${month + 1} / ${full_year}`
      // state.user.createdAt = `${day} / ${month + 1} / ${full_year}`
      state.user = action.payload
    },

    [register.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },

    [login.pending]: (state, action) => {
      state.loading = true
      state.isLogin = false
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false
      state.isLogin = true
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
      localStorage.setItem('users', JSON.stringify(state.users))
      state.user = action.payload
    },
    [login.rejected]: (state, action) => {
      state.loading = false
      state.isLogin = false
      state.error = action.payload.message
    },

    [userList.pending]: (state, action) => {
      state.loading = true
    },
    [userList.fulfilled]: (state, action) => {
      state.loading = false
      state.users = action.payload
      // return { ...state, users: action.payload }
    },
    [userList.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [deleteUser.pending]: (state, action) => {
      state.loading = true
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false
      state.users = state.users.filter((user) => user._id !== action.payload)
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [editUser.pending]: (state, action) => {
      state.loading = true
    },
    [editUser.fulfilled]: (state, action) => {
      state.loading = false
      state.users = [action.payload]
    },
    [editUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
  },
})

export const getAllUsers = (state) => state.auth.users
export const { logoutUser } = authSlice.actions
export default authSlice.reducer
