import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminReducer";

const adminStore = configureStore({
  reducer: {
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for non-serializable values
      immutableCheck: false
    });
  },
});

export default adminStore;
