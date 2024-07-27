import { configureStore, isImmutableDefault } from "@reduxjs/toolkit";
import adminReducer from "./adminReducer";
import { serializeCellValue } from "@mui/x-data-grid/internals";


const reduxStore = configureStore({
    reducer: {
        admin: adminReducer,
    },
    middleware: (getDefaultMiddleware) => {
      const middlewares = getDefaultMiddleware({
        serializableCheck: {
          // Ignore these actions
          ignoredActions: [isImmutableDefault],
          },
          });
          return 
    }
})

export default reduxStore