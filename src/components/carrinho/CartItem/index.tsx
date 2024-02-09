import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import {
    iProdutoCarrinho,
    removeProductInCart,
    updateProductQnt,
} from 'app/carrinho.store';
import ItemCheckbox from './ItemCheckbox';
import { motion } from 'framer-motion';
import { BiBlock, BiCheck } from 'react-icons/bi';
import styles from './cartItem.module.scss';
import CartInputNumber from './CartInputNumber';

const checkVariants = {
    show: {
        opacity: 1,
        transition: { duration: 0.3 },
    },
    hide: {
        opacity: 0,
        transition: { duration: 0.3 },
    },
};

interface Props {
    product: iProdutoCarrinho;
}

const CartItem: React.FC<Props> = ({ product }) => {
    const {
        data: { user },
    } = useSession();
    const dispatch = useDispatch();

    const [isChecked, setIsChecked] = useState(true);

    const imgCapaIdx = product.produto_imagem.findIndex(
        (img) => img.img_ordem === 1,
    );

    const handleRemoveClick = () => {
        dispatch(
            removeProductInCart({
                userId: user.id,
                productId: product.prod_cod,
            }),
        );
    };

    return (
        <>
            <div className="flex w-full">
                <div className="hidden w-fit items-center justify-center sm:flex">
                    <ItemCheckbox
                        product={product}
                        isChecked={isChecked}
                        setIsChecked={setIsChecked}
                    />
                </div>

                <div className="flex w-full items-center justify-between sm:pl-8">
                    <div className={styles.itemImg}>
                        <motion.div
                            initial={false}
                            variants={checkVariants}
                            animate={isChecked ? 'show' : 'hide'}
                            className="absolute z-10 flex h-full w-full items-center justify-center rounded-2xl bg-violet-800/50 shadow-md shadow-violet-600/40 sm:hidden"
                        >
                            <BiCheck className="text-3xl text-white" />
                        </motion.div>
                        <img
                            className="absolute h-full w-full rounded-2xl object-cover"
                            src={product.produto_imagem[imgCapaIdx].img_link}
                        />
                    </div>
                    <div className="flex w-full flex-col py-2 pl-8">
                        <div className="flex w-full flex-col sm:flex-row">
                            <div className="flex w-full flex-col sm:w-1/2">
                                <h2 className="mb-2 block w-40 overflow-hidden text-ellipsis whitespace-nowrap text-lg text-violet-800 md:w-60 md:text-xl lg:w-52 xl:w-64">
                                    {product.prod_nome}
                                </h2>
                                <span className="mb-5 block w-40 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-violet-400 sm:text-base md:w-60 lg:w-52 xl:w-64">
                                    {product.prod_descricao}
                                </span>
                            </div>
                            <div className="flex w-full sm:w-1/2 sm:justify-end">
                                <h1 className="mb-4 text-xl text-violet-700 sm:mb-0 md:text-2xl">
                                    {'R$' +
                                        parseFloat(
                                            product.prod_preco.toString(),
                                        ).toFixed(2)}
                                </h1>
                            </div>
                        </div>
                        <div className="flex w-full flex-col justify-between sm:flex-row">
                            <div
                                style={{ maxWidth: '150px' }}
                                className="max-x-sm mb-4 flex w-full items-center sm:mb-0"
                            >
                                <CartInputNumber
                                    product={product}
                                    updateValue={updateProductQnt}
                                    userId={user.id}
                                />
                            </div>
                            <div className="flex flex-col justify-center sm:flex-row sm:items-center">
                                <button
                                    onClick={() => setIsChecked(!isChecked)}
                                    style={{ maxWidth: '180px' }}
                                    className="w-26 mb-3 flex items-center justify-center rounded-full bg-violet-800 px-4 py-3 text-sm text-white sm:mb-0 sm:mr-2 sm:hidden"
                                >
                                    {isChecked ? (
                                        <>
                                            <BiBlock className="mr-2 text-xl" />
                                            <span>Desselecionar</span>
                                        </>
                                    ) : (
                                        <>
                                            <BiCheck className="mr-2 text-xl" />
                                            <span>Selecionar</span>
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => handleRemoveClick()}
                                    style={{ maxWidth: '180px' }}
                                    className="w-26 flex items-center justify-center rounded-full bg-violet-900 px-4 py-3 text-sm text-white"
                                >
                                    <IoMdClose className="mr-2 text-xl" />
                                    <span>Excluir</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-4 mt-6 h-0.5 w-10 self-center rounded-2xl bg-violet-100"></div>
        </>
    );
};

export default CartItem;
