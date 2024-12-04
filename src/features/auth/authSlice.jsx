import { createSlice } from "@reduxjs/toolkit"
import { loginThunk, registerThunk } from "./authThunk"
import { jwtDecode } from "jwt-decode"

const authSlice = createSlice({
  name: "auth",

  initialState: {
    name: null,
    isAuthenticated: false,
    tokenExpiration: null,
    token: null,
    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.name = null
      state.isAuthenticated = false
      state.tokenExpiration = null
      state.token = null
      state.loading = false
      state.error = null
    },
  },

  extraReducers: (builder) => {
    // login
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { name, token } = action.payload
        const decode = jwtDecode(token)
        const tokenExpiration = decode.exp
        state.token = token
        state.name = name
        state.isAuthenticated = true
        state.tokenExpiration = tokenExpiration || null
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })

    // register
    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        const { name, token } = action.payload
        const decode = jwtDecode(token)
        const tokenExpiration = decode.exp
        state.token = token
        state.name = name
        state.isAuthenticated = true
        state.tokenExpiration = tokenExpiration || null
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
  },
})

export const { logout } = authSlice.actions
export const authReducer = authSlice.reducer
