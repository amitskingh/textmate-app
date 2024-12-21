import { createSlice } from "@reduxjs/toolkit"
import {
  fetchLibraryThunk,
  addLibraryThunk,
  deleteLibraryThunk,
  renameLibraryThunk,
} from "./libraryThunk"

const initialState = {
  libraries: [],
  status: {
    fetch: { loading: false, error: null },
    add: { loading: false, error: null },
    rename: { loading: false, error: null },
    delete: { loading: false, error: null },
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 0,
    totalItems: 0,
  },
  filters: {
    nameOrder: null,
    dateType: null,
  },
}

// Slice
const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...action.payload }
    },
    clearError: (state, action) => {
      const { actionType } = action.payload
      if (state.status[actionType]) {
        state.status[actionType].error = null
      }
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload
    },
    setFilter: (state, action) => {
      const { key, value } = action.payload
      state.filters[key] = value
    },
    removeFilter: (state, action) => {
      state.filters = {
        nameOrder: null,
        dateType: null,
      }
      state.pagination.currentPage = 1
    },
  },
  extraReducers: (builder) => {
    // Fetch Library
    builder
      .addCase(fetchLibraryThunk.pending, (state) => {
        state.status.fetch.loading = true
        state.status.fetch.error = null
      })
      .addCase(fetchLibraryThunk.fulfilled, (state, action) => {
        state.status.fetch.loading = false
        state.libraries = action.payload.data
        state.pagination = action.payload.meta.pagination
      })
      .addCase(fetchLibraryThunk.rejected, (state, action) => {
        state.status.fetch.loading = false
        state.status.fetch.error = action.payload
      })

    // Add Library
    builder
      .addCase(addLibraryThunk.pending, (state) => {
        state.status.add.loading = true
        state.status.add.error = null
      })
      .addCase(addLibraryThunk.fulfilled, (state, action) => {
        state.status.add.loading = false
        state.libraries.unshift(action.payload.data)
        if (state.libraries.length > 10) {
          state.libraries.pop()
        }
      })
      .addCase(addLibraryThunk.rejected, (state, action) => {
        state.status.add.loading = false
        state.status.add.error = action.payload
      })

    // Rename Library
    builder
      .addCase(renameLibraryThunk.pending, (state) => {
        state.status.rename.loading = true
        state.status.rename.error = null
      })
      .addCase(renameLibraryThunk.fulfilled, (state, action) => {
        state.status.rename.loading = false
        const index = state.libraries.findIndex(
          (lib) => lib._id === action.payload.data._id
        )
        if (index !== -1) {
          state.libraries[index] = action.payload.data
        }
      })
      .addCase(renameLibraryThunk.rejected, (state, action) => {
        state.status.rename.loading = false
        state.status.rename.error = action.payload
      })

    // Delete Library
    builder
      .addCase(deleteLibraryThunk.pending, (state) => {
        state.status.delete.loading = true
        state.status.delete.error = null
      })
      .addCase(deleteLibraryThunk.fulfilled, (state, action) => {
        state.status.delete.loading = false
        state.libraries = state.libraries.filter(
          (lib) => lib._id !== action.payload.data._id
        )
      })
      .addCase(deleteLibraryThunk.rejected, (state, action) => {
        state.status.delete.loading = false
        state.status.delete.error = action.payload
      })
  },
})

export const {
  setFilters,
  clearError,
  setCurrentPage,
  setFilter,
  removeFilter,
} = librarySlice.actions
export const libraryReducer = librarySlice.reducer
