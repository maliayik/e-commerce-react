import {createContext, PropsWithChildren, useContext, useState} from "react";
import {Cart} from "../../model/ICart.ts";

interface ICartContextValue {
    cart: Cart | null;
    setCart: (cart: Cart) => void;  
}

export const CartContext = createContext<ICartContextValue | undefined>(undefined);

//Son olarak CartContexti global olarak export ediyoruz her yerde sıfırdan tanımlamamak için.
export function useCartContext() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("no provider");
    }
    return context;
}

//CartcontextProvider sayesinde ICartContextValue içerisindeki verilere erişebilmeleri için tanımlıyoruz,
//childeren paremetresi ise uygulamamızda kullandığımız componentlerimize karşılık gelmektedir.
export function CartcontextProvider({children}: PropsWithChildren<any>) {
    const [cart, setCart] = useState<Cart | null>(null);

    

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    );
}