import {CircularProgress, Container, CssBaseline} from "@mui/material";
import {Outlet} from "react-router";
import {ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../store/store.ts";
import {getCart} from "../pages/cart/cartSlice.ts";
import Header from "./Header.tsx";
import {getUser} from "../pages/account/AccountSlice.ts";


function App() {

    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    const initApp = async () => {
        await dispatch(getCart());
        await dispatch(getUser());      
    }

    useEffect(() => {
        initApp().then(() => setLoading(false));
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
