import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminReducer";

const reduxStore = configureStore({
  reducer: {
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for non-serializable values
      imm
    });
  },
});

export default reduxStore;
