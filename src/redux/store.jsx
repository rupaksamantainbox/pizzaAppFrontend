import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./slices/AuthSlice";

export const store = configureStore({
    reducer: {
        auth: AuthSliceReducer,
       
    },
    devTools: true,
    
});