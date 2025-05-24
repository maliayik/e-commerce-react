import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import {Alert, Paper, TableCell, TableHead, TableRow} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import {LoadingButton} from "@mui/lab";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
import {toast} from "react-toastify";
import CartSummary from "./CartSummary.tsx";
import {currencyTry} from "../../utils/formatCurrency.ts";
import {addItemToCart, deleteItemFromCart} from "./cartSlice.ts";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";

export default function ShoppingCartPage() {

    const {cart, status} = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();


    if (cart?.cartItems.length === 0) return <Alert severity={"warning"}>Sepetinizde Ürün yok</Alert>;

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell align="right">Fiyat</TableCell>
                        <TableCell align="right">Adet</TableCell>
                        <TableCell align="right">Toplam</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart?.cartItems.map((item) => (
                        <TableRow
                            key={item.productId}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                <img src={`http://localhost:5257/images/${item.imageUrl}`} style={{height: 60}}/>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {item.name}
                            </TableCell>
                            <TableCell align="right">{currencyTry.format(item.price)}</TableCell>
                            <TableCell align="right">
                                <LoadingButton
                                    loading={status === "pendingAddItem" + item.productId}
                                    onClick={() => dispatch(addItemToCart({productId: item.productId}))}>
                                    <AddCircleOutline/>
                                </LoadingButton>
                                {item.quantity}
                                <LoadingButton
                                    loading={status === "pendingDeleteItem" + item.productId + "single"}
                                    onClick={() => dispatch(deleteItemFromCart({
                                        productId: item.productId,
                                        quantity: 1,
                                        key: "single"
                                    }))}>
                                    <RemoveCircleOutline/>
                                </LoadingButton>
                            </TableCell>
                            <TableCell align="right">{currencyTry.format(item.price * item.quantity)} ₺</TableCell>
                            <TableCell align="right">
                                <LoadingButton color={"error"}
                                               loading={status === "pendingDeleteItem" + item.productId + "all"}
                                               onClick={() => {
                                                   dispatch(deleteItemFromCart({
                                                       productId: item.productId,
                                                       quantity: item.quantity,
                                                       key: "all"
                                                   }));
                                                   toast.error("ürün sepetinizden silindi");
                                               }}>
                                    <Delete/>
                                </LoadingButton>
                            </TableCell>
                        </TableRow>
                    ))}{
                    <CartSummary></CartSummary>
                }
                </TableBody>
            </Table>
        </TableContainer>
    )
}