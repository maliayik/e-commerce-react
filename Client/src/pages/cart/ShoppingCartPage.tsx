import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import {Alert, Paper, TableCell, TableHead, TableRow} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import {useCartContext} from "../../context/CartContext.tsx";
import {useState} from "react";
import {LoadingButton} from "@mui/lab";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
import requests from "../../api/requests.ts";
import {toast} from "react-toastify";

export default function ShoppingCartPage() {

    const {cart, setCart} = useCartContext();
    const [status, setStatus] = useState({loading: false, id: ""});

    function handleAddItem(productId: number, id: string) {        
        setStatus({loading: true, id});
        requests.Cart.addItem(productId)
            .then(cart => setCart(cart))
            .catch(err => console.log(err))
            .finally(() => setStatus({loading: false, id}));
    }

    function handleDeleteItem(productId: number, id: string, quantity = 1) {
        setStatus({loading: true, id});
        requests.Cart.deleteItem(productId, quantity)
            .then((cart) => setCart(cart))
            .catch(err => console.log(err))
            .finally(() => setStatus({loading: false, id}));
    }

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
                            <TableCell align="right">{item.price} ₺</TableCell>
                            <TableCell align="right">
                                <LoadingButton
                                    loading={status.loading && status.id === "add" + item.productId}
                                    onClick={() => handleAddItem(item.productId, "add" + item.productId)}>
                                    <AddCircleOutline/>
                                </LoadingButton>
                                {item.quantity}
                                <LoadingButton
                                    loading={status.loading && status.id === "del" + item.productId}
                                    onClick={() => handleDeleteItem(item.productId, "del" + item.productId)}>
                                    <RemoveCircleOutline/>
                                </LoadingButton>
                            </TableCell>
                            <TableCell align="right">{item.price * item.quantity} ₺</TableCell>
                            <TableCell align="right">
                                <LoadingButton color={"error"}
                                               loading={status.loading && status.id === "dell_all" + item.productId}
                                               onClick={() => {
                                                   handleDeleteItem(item.productId, "del_all" + item.productId, item.quantity);
                                                   toast.error("ürün sepetinizden silindi");
                                               }}>
                                    <Delete/>
                                </LoadingButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}