import Checkbox from 'components/common/form/CheckBox';
import CartContext from 'contexts/CartContext';
import { useEffect, useState, useContext } from 'react';
import { iProduto } from 'types/Produto';

interface Props {
    product: iProduto & { prod_qtdCarrinho: number };
    isChecked: boolean;
    setIsChecked?: (val: boolean) => void;
}

const ItemCheckbox: React.FC<Props> = ({
    product,
    isChecked,
    setIsChecked,
}) => {
    const { cartTotal, setCartTotal } = useContext(CartContext);
    const { checkedProducts, setCheckedProducts } = useContext(CartContext);

    useEffect(() => {
        const prodIdx = checkedProducts.findIndex(
            (item) => item.prod_cod === product.prod_cod,
        );

        if (isChecked) {
            if (prodIdx === -1) {
                setCheckedProducts([...checkedProducts, product]);
            }
        } else if (prodIdx !== -1) {
            setCheckedProducts(
                checkedProducts.filter(
                    (item) => item.prod_cod !== product.prod_cod,
                ),
            );
        }
    }, [isChecked]);

    return <Checkbox isChecked={isChecked} setIsChecked={setIsChecked} />;
};

export default ItemCheckbox;
