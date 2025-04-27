import {useEffect, useState} from "react";
import {IProduct} from "../../../model/IProduct.ts";
import ProductList from "./ProductList.tsx";

export default function CatalogPage() {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        fetch("http://localhost:5257/api/products")
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <ProductList products={products}/>
    )
}