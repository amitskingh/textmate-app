import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import axiosInstance from "../../api/axiosConfig"

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      })
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
      const response = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
      })

      return response.data
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Server unavailable. Please try again later."
      return rejectWithValue(errorMessage)
    }
  }
)
