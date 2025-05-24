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
import {useEffect} from "react";
import NotFound from "../../errors/NotFound.tsx";
import {LoadingButton} from "@mui/lab";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";

import {currencyTry} from "../../utils/formatCurrency.ts";

import {addItemToCart} from "../cart/cartSlice.ts";
import {fetchProductById, selectProductById} from "./catalogSlice.ts";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";

export default function ProductDetailsPage() {
    const {cart, status} = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const {id} = useParams<{ id: string }>();
    const product = useAppSelector(state => selectProductById(state, Number(id)));
    const {status: loading} = useAppSelector(state => state.catalog);

    const item = cart?.cartItems.find(i => i.productId == product?.id);
    useEffect(() => {
        if (!product && id)
            dispatch(fetchProductById(parseInt(id)))
    }, [id]);

    if (loading === "pendingFetchProductById") return <CircularProgress/>
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
                                   loading={status === "pendingAddItem" + product.id}
                                   onClick={() => dispatch(addItemToCart({productId: product?.id}))}>
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