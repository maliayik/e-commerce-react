import {CircularProgress, Container, CssBaseline} from "@mui/material";
import {Outlet} from "react-router";
import {ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import requests from "../api/requests.ts";
import {useAppDispatch} from "../hooks/hooks.ts";
import {setCart} from "../pages/cart/cartSlice.ts";
import {logout, setUser} from "../pages/account/AccountSlice.ts";
import Header from "./Header.tsx";

function App() {

    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    //Bir önceki cart ve user bilgilerini almak için App.tsx dosyamıza useEffect ekliyoruz.
    useEffect(() => {        
        dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
        // 
        requests.Account.getUser()
            .then(user => {
                setUser(user);
                localStorage.setItem("user", JSON.stringify(user));
            })
            .catch(error => {
                console.log(error);
                dispatch(logout());
            });

        requests.Cart.get()
            .then(cart => dispatch(setCart(cart)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));

    }, []);

    if (loading) return <CircularProgress/>;

    return (
        < >
            <ToastContainer position={"bottom-right"} hideProgressBar theme={"colored"}/>
            <CssBaseline></CssBaseline>
            <Header></Header>
            <Container>
                <Outlet></Outlet>
            </Container>
        </>

    )
}

export default App
