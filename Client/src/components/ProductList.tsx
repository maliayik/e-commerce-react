import Product from "./Product.tsx";
import {IProduct} from "../../model/IProduct.ts";

interface Props {
    products: IProduct[];
    addProduct: () => void;

}

export default function ProductList(props: Props) {


    return (
        <div>
            <h2>ProductList</h2>
            {props.products.map((p: any) => (
                p.isActive && <Product key={p.id} product={p}/>
            ))}
            <button onClick={props.addProduct}>Add Product</button>
        </div>

    );

    console.log("render");
}