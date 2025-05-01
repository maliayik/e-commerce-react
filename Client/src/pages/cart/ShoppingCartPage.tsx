import {useEffect, useState} from "react";
import requests from "../../api/requests.ts";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import {CircularProgress, IconButton, Paper, TableCell, TableHead, TableRow} from "@mui/material";
import {Cart} from "../../../model/ICart.ts";
import Delete from "@mui/icons-material/Delete";

export default function ShoppingCartPage() {

    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState<Cart | null>(null);

    useEffect(() => {
        requests.Cart.get()
            .then(cart => setCart(cart))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <CircularProgress/>;

    if (!cart) return <h1>Sepetinizde Ürün Bulunmamaktadır!</h1>

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
                    {cart.cartItems.map((item) => (
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
                            <TableCell align="right">{item.price} ₺</TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">{item.price * item.quantity} ₺</TableCell>
                            <TableCell align="right">
                                <IconButton color={"error"}>
                                    <Delete/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}