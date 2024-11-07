// setting up redux store
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import concertReducer from "../slices/concertSlice";

export const store = configureStore({
    reducer: {
        auth : authReducer ,
        concert : concertReducer 
    },
})