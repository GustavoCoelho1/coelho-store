import { InputText } from 'components/common/form/utils';
import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { iProdutoCarrinho, updateProductQnt } from 'app/carrinho.store';
import CartContext from 'contexts/CartContext';

interface Props {
    product: iProdutoCarrinho;
    userId: string;
    updateValue: typeof updateProductQnt;
}

const CartInputNumber = ({ product, userId, updateValue }: Props) => {
    const dispatch = useDispatch();
    const { checkedProducts, setCartTotal } = useContext(CartContext);

    const {
        prod_cod: productId,
        prod_qtdCarrinho: value,
        prod_estoque: max,
    } = product;

    const handleMenosClick = () => {
        if (value > 1) {
            const qtd = value - 1;
            dispatch(updateValue({ qtd, productId, userId }));
        }
    };

    const handleMaisClick = () => {
        if (value < max) {
            const qtd = value + 1;
            dispatch(updateValue({ qtd, productId, userId }));
        }
    };

    const handleChange = (e) => {
        if (e.target.value > 1 && e.target.value <= max) {
            const qtd = e.target.value;
            dispatch(updateValue({ qtd, productId, userId }));
        } else {
            const qtd = 1;
            dispatch(updateValue({ qtd, productId, userId }));
        }
    };

    useEffect(() => {
        let newTotal = 0;

        checkedProducts.forEach((item) => {
            newTotal += Number(item.prod_preco) * item.prod_qtdCarrinho;
        });

        setCartTotal(newTotal);
    }, [value, checkedProducts]);

    return (
        <div className="relative flex w-full items-center justify-center">
            <motion.button
                whileTap={{ scale: 1.2, transition: { duration: 0.3 } }}
                onClick={() => handleMenosClick()}
                className="flex items-center rounded-xl bg-violet-800 px-3 py-1 text-white"
            >
                -
            </motion.button>
            <InputText
                style={{ minWidth: '60px' }}
                type="number"
                placeholder="1"
                $center
                value={value}
                onChange={(e) => handleChange(e)}
                $extra={'mx-2'}
                readOnly
            />
            <motion.button
                whileTap={{ scale: 1.2, transition: { duration: 0.3 } }}
                onClick={() => handleMaisClick()}
                className="flex items-center rounded-xl bg-violet-800 px-3 py-1 text-white"
            >
                +
            </motion.button>
        </div>
    );
};

export default CartInputNumber;
