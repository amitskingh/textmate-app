import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../../api/axiosConfig"

// Fetch notes (with pagination and filters)
export const fetchNoteThunk = createAsyncThunk(
  "note/fetchNote",
  async ({ librarySlug, page, nameOrder, dateType }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/library/${librarySlug}/note`, {
        params: { page, nameOrder, dateType },
      })

      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch notes."
      )
    }
  }
)

// Add a new Note
export const addNoteThunk = createAsyncThunk(
  "note/addNote",
  async ({ librarySlug, noteName }, { rejectWithValue }) => {
    try {
      console.log(noteName)

      const response = await axiosInstance.post(
        `/library/${librarySlug}/note`,
        { noteName }
      )
      return response.data // Assume response contains the new library object
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add note."
      )
    }
  }
)

// Rename a library
export const renameNoteThunk = createAsyncThunk(
  "note/renameNote",
  async ({ librarySlug, noteSlug, updatedNoteName }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/library/${librarySlug}/note/${noteSlug}/rename`,
        {
          noteName: updatedNoteName,
        }
      )
      return response.data // Assume response contains the updated library object
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to rename note."
      )
    }
  }
)

// Delete a note
export const deleteNoteThunk = createAsyncThunk(
  "note/deleteNote",
  async ({ librarySlug, noteSlug }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/library/${librarySlug}/note/${noteSlug}`
      )
      console.log(response.data)

      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete note."
      )
    }
  }
)
