import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {router} from "./router/Routes.tsx";
import {RouterProvider} from "react-router";
import {CartcontextProvider} from "./context/CartContext.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <CartcontextProvider>
                <RouterProvider router={router}></RouterProvider>
            </CartcontextProvider>
        </Provider>
    </StrictMode>,
)
