import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        {
          email,
          password,
        }
      )
      return response.data
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Server unavailable. Please try again later."
      return rejectWithValue(errorMessage)
    }
  }
)

export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        {
          name,
          email,
          password,
        }
      )

      return response.data
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Server unavailable. Please try again later."
      return rejectWithValue(errorMessage)
    }
  }
)
