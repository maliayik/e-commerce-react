import TableRow from "@mui/material/TableRow";
import {TableCell} from "@mui/material";
import {useCartContext} from "../../context/CartContext.tsx";
import {currencyTry} from "../../utils/formatCurrency.ts";

export default function CartSummary() {
    const {cart} = useCartContext();
    const subTotal = cart?.cartItems.reduce((toplam, item) => toplam + (item.quantity * item.price), 0) ?? 0;
    const tax = subTotal * 0.2;
    const total = subTotal + tax;
    return (
        <>
            <TableRow>
                <TableCell align={"right"} colSpan={5}>Ara Toplam</TableCell>
                <TableCell align={"right"}>{currencyTry.format(subTotal)}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell align={"right"} colSpan={5}>Vergi (%20)</TableCell>
                <TableCell align={"right"}>{currencyTry.format(tax)}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell align={"right"} colSpan={5}>Toplam</TableCell>
                <TableCell align={"right"}>{currencyTry.format(total)}</TableCell>
            </TableRow>

        </>
    );
}