import {configureStore} from "@reduxjs/toolkit";
import {counterSlice} from "../pages/counter/counterSlice.ts";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    }
});


export type RootsState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;