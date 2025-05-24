import {useEffect} from "react";
import ProductList from "./ProductList.tsx";
import {CircularProgress} from "@mui/material";
import {fetchProducts, selectAllProducts} from "./catalogSlice.ts";
import { useAppDispatch, useAppSelector } from "../../store/store.ts";


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