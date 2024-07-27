import { configureStore } from "@reduxjs/toolkit";


const reduxStore = configureStore({
    reducer: {
        admin: admin,
    },
})

export default reduxStore