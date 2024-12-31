import { createSlice } from "@reduxjs/toolkit"
import {
  fetchNoteThunk,
  addNoteThunk,
  deleteNoteThunk,
  renameNoteThunk,
} from "./noteThunk"

const initialState = {
  notes: [],
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
const noteSlice = createSlice({
  name: "note",
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
      // console.log(state.pagination)
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
    },
  },
  extraReducers: (builder) => {
    // Fetch Note
    builder
      .addCase(fetchNoteThunk.pending, (state) => {
        state.status.fetch.loading = true
        state.status.fetch.error = null
      })
      .addCase(fetchNoteThunk.fulfilled, (state, action) => {
        state.status.fetch.loading = false
        state.notes = action.payload.data
        state.pagination = action.payload.meta.pagination
        // console.log("NOTE PAGINATION: ", action.payload.meta.pagination)
      })
      .addCase(fetchNoteThunk.rejected, (state, action) => {
        state.status.fetch.loading = false
        state.status.fetch.error = action.payload
        // console.log(action.payload)
      })

    // Add Note
    builder
      .addCase(addNoteThunk.pending, (state) => {
        state.status.add.loading = true
        state.status.add.error = null
      })
      .addCase(addNoteThunk.fulfilled, (state, action) => {
        state.status.add.loading = false
        state.notes.unshift(action.payload.data)
        if (state.notes.length > 10) {
          state.notes.pop()
        }
      })
      .addCase(addNoteThunk.rejected, (state, action) => {
        state.status.add.loading = false
        state.status.add.error = action.payload
      })

    // Rename Note
    builder
      .addCase(renameNoteThunk.pending, (state) => {
        state.status.rename.loading = true
        state.status.rename.error = null
      })
      .addCase(renameNoteThunk.fulfilled, (state, action) => {
        state.status.rename.loading = false
        const index = state.notes.findIndex(
          (note) => note._id === action.payload.data._id
        )
        if (index !== -1) {
          state.notes[index] = action.payload.data
        }
      })
      .addCase(renameNoteThunk.rejected, (state, action) => {
        state.status.rename.loading = false
        state.status.rename.error = action.payload
      })

    // Delete Note
    builder
      .addCase(deleteNoteThunk.pending, (state) => {
        state.status.delete.loading = true
        state.status.delete.error = null
      })
      .addCase(deleteNoteThunk.fulfilled, (state, action) => {
        state.status.delete.loading = false
        state.notes = state.notes.filter(
          (note) => note._id !== action.payload.data._id
        )
      })
      .addCase(deleteNoteThunk.rejected, (state, action) => {
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
} = noteSlice.actions
export const noteReducer = noteSlice.reducer
