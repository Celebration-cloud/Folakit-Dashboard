import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminReducer";


const reduxStore = configureStore({
    reducer: {
        admin: adminReducer,
    },
})

export default reduxStore