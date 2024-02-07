import { gql, useQuery } from '@apollo/client';
import { useSelect } from '@mui/base';
import { useSession } from 'next-auth/react';
import { useState, createContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app';
import carrinhoStore, { iProdutoCarrinho } from 'app/carrinho.store';
import { iProduto } from '../types/Produto';

interface CartContextProps {
    checkedProducts: iProdutoCarrinho[];
    setCheckedProducts: (val: iProdutoCarrinho[]) => void;
    cartTotal: number;
    setCartTotal: (val: number) => void;
    address: {
        id: string;
        name: string;
    };
    setAddress: (val: { id: string; name: string }) => void;
}

const CartContext = createContext({} as CartContextProps);

export const CartProvider = ({ children }) => {
    const {
        data: { user },
    } = useSession();

    const cartStore = useSelector(
        (state: RootState) => state.carrinho.carrinhos,
    );

    const thisIdx = cartStore.findIndex((item) => item.id === user.id);

    const [checkedProducts, setCheckedProducts] = useState<iProdutoCarrinho[]>(
        cartStore[thisIdx].carrinhoProdutos,
    );
    const [address, setAddress] = useState({ id: '', name: '' });
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const updatedCart = cartStore[thisIdx].carrinhoProdutos.filter(
            (item) => {
                return (
                    checkedProducts.find(
                        (checkedItem) => checkedItem.prod_cod === item.prod_cod,
                    ) != undefined
                );
            },
        );

        setCheckedProducts(updatedCart);
    }, [cartStore]);

    const contextValue = {
        checkedProducts,
        setCheckedProducts,
        cartTotal,
        setCartTotal,
        address,
        setAddress,
    };

    useEffect(() => {
        let newTotal = 0;

        checkedProducts.forEach((item) => {
            newTotal += Number(item.prod_preco) * item.prod_qtdCarrinho;
        });

        setCartTotal(newTotal);
    }, [checkedProducts]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
