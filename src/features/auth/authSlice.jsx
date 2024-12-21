import { createSlice } from "@reduxjs/toolkit"
import { loginThunk, registerThunk } from "./authThunk"
import { jwtDecode } from "jwt-decode"

// Retrieve token and user from localStorage
const token = localStorage.getItem("token")
const decodedUser = token ? jwtDecode(token) : null

const initialState = {
  user: decodedUser, // Retrieve user details from the decoded token
  token: token || null, // Retrieve token from localStorage
  isAuthenticated: !!token, // Boolean based on token presence
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null
      localStorage.removeItem("token") // Remove token from localStorage
    },
    clearError: (state) => {
      state.error = null // Clear error messages
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { token } = action.payload
        const decoded = jwtDecode(token)
        state.token = token
        state.user = decoded
        state.isAuthenticated = true
        state.loading = false
        state.error = null
        localStorage.setItem("token", token) // Save token to localStorage
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })

    // Register
    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        const { token } = action.payload
        const decoded = jwtDecode(token)
        state.token = token
        state.user = decoded
        state.isAuthenticated = true
        state.loading = false
        state.error = null
        localStorage.setItem("token", token) // Save token to localStorage
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
  },
})

export const { logout, clearError } = authSlice.actions
export const authReducer = authSlice.reducer
