import SearchIcon from '@mui/icons-material/Search';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {IProduct} from "../../../model/IProduct.ts";
import {Link} from 'react-router';
import {LoadingButton} from "@mui/lab";
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import {currencyTry} from "../../utils/formatCurrency.ts";
import {useAppDispatch, useAppSelector} from '../../hooks/hooks.ts';
import {addItemToCart} from '../cart/cartSlice.ts';


interface Props {
    product: IProduct
}

export default function Product({product}: Props) {

    const {status} = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

    return (

        <Card>
            <CardMedia sx={{height: 250, backgroundSize: "contain"}}
                       image={`http://localhost:5257/images/${product.imageUrl}`}/>
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2" color="text.secondary">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="secondary">
                    {currencyTry.format(product.price)}₺
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton startIcon={<AddShoppingCart/>}
                               size={"small"}
                               variant="outlined"
                               loadingPosition={"start"}
                               loading={status === "pendingAddItem" + product.id}
                               onClick={() => dispatch(addItemToCart({productId: product.id}))}> Sepete
                    Ekle </LoadingButton>

                <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" size="small"
                        startIcon={<SearchIcon/>}
                        color={"primary"}>Görüntüle</Button>

            </CardActions>
        </Card>

    )
}