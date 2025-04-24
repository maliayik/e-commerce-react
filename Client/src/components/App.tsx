import {useEffect, useState} from "react";
import Header from "./Header.tsx";
import ProductList from "./ProductList.tsx";
import {IProduct} from "../../model/IProduct.ts";
import {Container, CssBaseline} from "@mui/material";

function App() {

    const [products, setProducts] = useState<IProduct[]>([]);

  
    //API'dan gelen product datasını setProducts aracılığıyla products list içerisine eklemiş oluruz
    //useEffect kullanarak component ilk yüklendiğinde sayfa render edilmiş olur.
    useEffect(() => {
        fetch("http://localhost:5257/api/products")
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);
    return (
        <>
            <CssBaseline></CssBaseline>
            <Header></Header>
            <Container>
                <ProductList products={products}></ProductList>
            </Container>
        </>

    )

}


export default App
