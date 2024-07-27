import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminReducer";
import { serializeCellValue } from "@mui/x-data-grid/internals";


const reduxStore = configureStore({
    reducer: {
        admin: adminReducer,
    },
    middleware: {
      serializeCellValue
    }
})

export default reduxStore