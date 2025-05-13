import SearchIcon from '@mui/icons-material/Search';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {IProduct} from "../../../model/IProduct.ts";
import {Link} from 'react-router';
import requests from "../../api/requests.ts";
import {useState} from "react";
import {LoadingButton} from "@mui/lab";
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import {useCartContext} from "../../context/CartContext.tsx";
import {toast} from "react-toastify";


interface Props {
    product: IProduct
}

export default function Product({product}: Props) {

    const [loading, setLoading] = useState(false);
    const {setCart} = useCartContext();

    function handleAddItem(productId: number) {
        setLoading(true);
        requests.Cart.addItem(productId)
            .then(cart => {
                setCart(cart);
                toast.success("Sepetinize eklendi");
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));

    }

    return (

        <Card>
            <CardMedia sx={{height: 250, backgroundSize: "contain"}}
                       image={`http://localhost:5257/images/${product.imageUrl}`}/>
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2" color="text.secondary">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="secondary">
                    {(product.price / 100).toFixed(2)}₺
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton startIcon={<AddShoppingCart/>}
                               size={"small"}
                               variant="outlined"
                               loadingPosition={"start"}
                               loading={loading}
                               onClick={() => handleAddItem(product.id)}> Sepete Ekle </LoadingButton>

                <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" size="small"
                        startIcon={<SearchIcon/>}
                        color={"primary"}>Görüntüle</Button>

            </CardActions>
        </Card>

    )
}