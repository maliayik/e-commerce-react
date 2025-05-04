import Header from "./Header.tsx";
import {CircularProgress, Container, CssBaseline} from "@mui/material";
import {Outlet} from "react-router";
import {ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import {useCartContext} from "../context/CartContext.tsx";
import requests from "../api/requests.ts";

function App() {

    const {setCart} = useCartContext();
    const [loading, setLoading] = useState(true);
    
    //Bir önceki cart bilgilerini almak için App.tsx dosyamıza useEffect ekliyoruz.
    useEffect(() => {
        requests.Cart.get()
            .then(cart => setCart(cart))
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
