import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {IProduct} from "../../model/IProduct.ts";

interface Props {
    product: IProduct
}

export default function Product({product}: Props) {
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
                <Button variant="outlined" size="small" startIcon={<ShoppingCartIcon/>} color={"success"}>Add to
                    Card</Button>
                <Button variant="outlined" size="small" startIcon={<SearchIcon/>} color={"primary"}>View</Button>

            </CardActions>
        </Card>

    )
}