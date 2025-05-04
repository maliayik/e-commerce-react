import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {router} from "./router/Routes.tsx";
import {RouterProvider} from "react-router";
import {CartcontextProvider} from "./context/CartContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CartcontextProvider>
            <RouterProvider router={router}></RouterProvider>
        </CartcontextProvider>
    </StrictMode>,
)
