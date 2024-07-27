import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminReducer";


const reduxStore = configureStore({
    reducer: {
        admin: adminReducer,
    },
    middleware: {
      se
    }
})

export default reduxStore