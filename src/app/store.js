import { libraryReducer } from "../features/library/librarySlice"
import { noteReducer } from "../features/note/noteSlice"
import { authReducer } from "../features/auth/authSlice"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
  reducer: {
    auth: authReducer,
    library: libraryReducer,
    note: noteReducer,
  },
})

export { store }
