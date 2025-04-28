import Header from "./Header.tsx";
import {Container, CssBaseline} from "@mui/material";
import {Outlet} from "react-router";
import {ToastContainer} from "react-toastify";

function App() {

    return (
        <>
            <ToastContainer position={"bottom-right"} hideProgressBar theme={"colored"}></ToastContainer>
            <CssBaseline></CssBaseline>
            <Header></Header>
            <Container>
                <Outlet></Outlet>
            </Container>
        </>

    )
}

export default App
