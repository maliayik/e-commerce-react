import {configureStore} from "@reduxjs/toolkit";
import {counterSlice} from "../pages/counter/counterSlice.ts";
import {cartSlice} from "../pages/cart/cartSlice.ts";
import {catalogSlice} from "../pages/catalog/catalogSlice.ts";
import {accountSlice} from "../pages/account/AccountSlice.ts";
import {useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        cart: cartSlice.reducer,
        catalog: catalogSlice.reducer,
        account: accountSlice.reducer,
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export  const useAppDispatch =  useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();