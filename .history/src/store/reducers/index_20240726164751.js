import { configureStore } from "@reduxjs/toolkit";


const reduxStore = configureStore({
    reducer: {
        adm: adm,
    },
})

export default reduxStore