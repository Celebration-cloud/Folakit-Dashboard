import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminReducer";


const reduxStore = configureStore({
    reducer: {
        admin: adminReducer,
    },
    middleware: {
      
    }
})

export default reduxStore