import { configureStore } from "@reduxjs/toolkit";


const reduxStore = configureStore({
    reducer: {
        admin: adm,
    },
})

export default reduxStore