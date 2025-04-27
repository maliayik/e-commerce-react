import Header from "./Header.tsx";
import {Container, CssBaseline} from "@mui/material";
import {Outlet} from "react-router";

function App() {

    return (
        <>
            <CssBaseline></CssBaseline>
            <Header></Header>
            <Container>
                <Outlet></Outlet>
            </Container>
        </>

    )
}

export default App
