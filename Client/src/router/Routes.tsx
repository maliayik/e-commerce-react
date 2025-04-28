import {createBrowserRouter} from "react-router";
import App from "../components/App.tsx";
import HomePage from "../pages/HomePage.tsx";
import AboutPage from "../pages/AboutPage.tsx";
import ContactPage from "../pages/ContactPage.tsx";
import CatalogPage from "../pages/catalog/CatalogPage.tsx";
import ProductDetailsPage from "../pages/catalog/ProductDetails.tsx";
import ErrorPage from "../pages/catalog/ErrorPage.tsx";
import ServerError from "../errors/ServerError.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "", element: <HomePage></HomePage>},
            {path: "about", element: <AboutPage></AboutPage>},
            {path: "contact", element: <ContactPage></ContactPage>},
            {path: "catalog", element: <CatalogPage></CatalogPage>},
            {path: "error", element: <ErrorPage></ErrorPage>},
            {path: "server-error", element: <ServerError></ServerError>},
            {path: "catalog/:id", element: <ProductDetailsPage></ProductDetailsPage>}
        ]
    }
])