import {configureStore} from "@reduxjs/toolkit";
import {counterSlice} from "../pages/counter/counterSlice.ts";
import {cartSlice} from "../pages/cart/cartSlice.ts";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        cart:cartSlice.reducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;