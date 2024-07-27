import { configureStore, isImmutableDefault } from "@reduxjs/toolkit";
import adminReducer from "./adminReducer";
import { serializeCellValue } from "@mui/x-data-grid/internals";


const reduxStore = configureStore({
    reducer: {
        admin: adminReducer,
    },
    middleware: (ge)
})

export default reduxStore