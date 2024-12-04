import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  }
)

export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      })

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  }
)
