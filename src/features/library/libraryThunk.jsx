import axiosInstance from "../../api/axiosConfig"
import { createAsyncThunk } from "@reduxjs/toolkit"

// Fetch library (with pagination and filters)
export const fetchLibraryThunk = createAsyncThunk(
  "library/fetchLibrary",
  async ({ page, nameOrder, dateType }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/library", {
        params: { page, nameOrder, dateType },
      })

      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch libraries."
      )
    }
  }
)

// Add a new library
export const addLibraryThunk = createAsyncThunk(
  "library/addLibrary",
  async (libraryName, { rejectWithValue }) => {
    try {
      // console.log(libraryName)

      const response = await axiosInstance.post("/library", { libraryName })
      return response.data // Assume response contains the new library object
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add library."
      )
    }
  }
)

// Rename a library
export const renameLibraryThunk = createAsyncThunk(
  "library/renameLibrary",
  async ({ librarySlug, updatedLibraryName }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/library/${librarySlug}/rename`,
        {
          libraryName: updatedLibraryName,
        }
      )
      return response.data // Assume response contains the updated library object
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to rename library."
      )
    }
  }
)

// Delete a library
export const deleteLibraryThunk = createAsyncThunk(
  "library/deleteLibrary",
  async (librarySlug, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/library/${librarySlug}`)
      // console.log(response.data)

      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete library."
      )
    }
  }
)
