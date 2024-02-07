import CartContext from 'contexts/CartContext';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RootState } from 'app';
import CartItem from './CartItem';

const List = () => {
    const session = useSession();
    const carrinhoState = useSelector((state: RootState) => state.carrinho);

    const cartIdx = carrinhoState.carrinhos.findIndex(
        (item) => item.id === session.data.user.id,
    );

    return (
        <div className="mb-44 flex w-full items-center bg-white p-8 pt-6 shadow-lg shadow-violet-500/25 sm:w-11/12 sm:rounded-3xl md:ml-6 md:mr-4 md:flex-row md:pb-0 lg:w-2/3">
            <div className="flex w-full flex-col items-center">
                <span className="bold flex items-center text-2xl text-violet-600">
                    <MdOutlineShoppingCart className="text-3xl" />
                </span>
                <div className="my-4 h-0.5 w-full rounded-xl bg-violet-100" />
                <div className="flex w-full flex-col">
                    {cartIdx !== -1 &&
                    carrinhoState.carrinhos[cartIdx].carrinhoProdutos.length >
                        0 ? (
                        carrinhoState.carrinhos[cartIdx].carrinhoProdutos.map(
                            (produto, idx) => (
                                <CartItem
                                    key={produto.prod_cod}
                                    product={produto}
                                />
                            ),
                        )
                    ) : (
                        <span className="text-md mt-2 mb-6 text-center text-violet-900">
                            Ainda não há produtos no carrinho!
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default List;
