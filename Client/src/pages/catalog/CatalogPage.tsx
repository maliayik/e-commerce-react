import {useEffect, useState} from "react";
import {IProduct} from "../../../model/IProduct.ts";
import ProductList from "./ProductList.tsx";
import {CircularProgress} from "@mui/material";
import requests from "../../api/requests.ts";

export default function CatalogPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        requests.catalog.list()
            .then(data => setProducts(data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <CircularProgress/>
    return (
        <ProductList products={products}/>
    )
}