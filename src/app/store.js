import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage for persistence
import { authReducer } from "../features/auth/authSlice";

// Persist config for redux-persist
const persistConfig = {
  key: "root",
  storage, // Use localStorage to persist data
};

const persistedReducer = persistReducer(persistConfig, authReducer);

// Configure the store using redux-toolkit's configureStore
const store = configureStore({
  reducer: {
    auth: persistedReducer, // The persisted reducer for authentication
  },
  // Optionally, you can customize the middleware here if needed
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

const persistor = persistStore(store); // Create the persistor instance

export { store, persistor };
