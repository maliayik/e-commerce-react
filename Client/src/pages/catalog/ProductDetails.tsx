import {
    CircularProgress,
    Divider,
    Grid, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from "@mui/material";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {IProduct} from "../../../model/IProduct.ts";
import requests from "../../api/requests.ts";
import NotFound from "../../errors/NotFound.tsx";
import {LoadingButton} from "@mui/lab";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import {toast} from "react-toastify";
import {currencyTry} from "../../utils/formatCurrency.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks.ts";
import {setCart} from "../cart/cartSlice.ts";

export default function ProductDetailsPage() {
    const {cart} = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const {id} = useParams<{ id: string }>();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdded, setIsAdded] = useState(false);

    const item = cart?.cartItems.find(i => i.productId == product?.id);
    useEffect(() => {
        id && requests.Catalog.details(parseInt(id))
            .then(data => setProduct(data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id]);

    function handleAddItem(id: number) {
        setIsAdded(true);

        requests.Cart.addItem(id)
            .then(cart => {
                dispatch(setCart(cart));
                toast.success("Sepetinize eklendi");
            })
            .catch(error => console.log(error))
            .finally(() => setIsAdded(false));
    }

    if (loading) return <CircularProgress/>
    if (!product) return <NotFound></NotFound>


    return (
        <Grid container spacing={2}>
            <Grid size={{xl: 3, lg: 4, md: 5, sm: 6, xs: 12}}>
                <img src={`http://localhost:5257/images/${product.imageUrl}`} style={{width: "100%"}}/>
            </Grid>
            <Grid size={{xl: 9, lg: 8, md: 7, sm: 6, xs: 12}}>
                <Typography variant="h3"> {product.name} </Typography>
                <Divider sx={{mb: 2}}></Divider>
                <Typography variant={"h4"} color={"secondary"}>{currencyTry.format(product.price)} ₺</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Stock</TableCell>
                                <TableCell>{product.stock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack direction={"row"} spacing={2} sx={{mt: 3}}>
                    <LoadingButton variant={"outlined"} loadingPosition={"start"} startIcon={<AddShoppingCart/>}
                                   loading={isAdded}
                                   onClick={() => handleAddItem(product.id)}>
                        Sepete Ekle

                    </LoadingButton>
                    {
                        item?.quantity! > 0 && (
                            <Typography variant={"body2"}>Sepetinize {item?.quantity} adet eklendi</Typography>
                        )
                    }
                </Stack>
            </Grid>
        </Grid>

    )


}