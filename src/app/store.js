import { libraryReducer } from "../features/library/librarySlice"
import { authReducer } from "../features/auth/authSlice"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
  reducer: {
    auth: authReducer,
    library: libraryReducer,
  },
})

export { store }
