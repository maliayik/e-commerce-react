import {useEffect} from "react";
import ProductList from "./ProductList.tsx";
import {CircularProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks.ts";
import {fetchProducts, selectAllProducts} from "./catalogSlice.ts";


export default function CatalogPage() {
    const dispatch = useAppDispatch();
    const {status,isLoaded} = useAppSelector(state => state.catalog);
    const products = useAppSelector(selectAllProducts);

    useEffect(() => {
        if(!isLoaded)
        dispatch(fetchProducts());
    }, [isLoaded]);

    if (status === "pendingFetchProducts") return <CircularProgress/>
    return (
        <ProductList products={products}/>
    )
}