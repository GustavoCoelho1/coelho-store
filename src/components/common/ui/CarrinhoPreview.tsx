import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, Variants } from 'framer-motion';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { RootState } from 'app';

const CarrinhoPreview = ({ show }) => {
    const { status, data } = useSession();
    const carrinhoState = useSelector((state: RootState) => state.carrinho);

    const cartIdx =
        status === 'authenticated'
            ? carrinhoState.carrinhos.findIndex(
                  (item) => item.id === data.user.id,
              )
            : -1;

    const thisVariants = {
        hide: {
            opacity: 0,
            transition: {
                delay: 0.3,
            },
            transitionEnd: {
                display: 'none',
            },
        },
        show: {
            display: 'flex',
            opacity: 1,
        },
    } as Variants;

    return (
        <motion.div
            animate={show ? 'show' : 'hide'}
            variants={thisVariants}
            className="absolute top-10 z-30 flex w-80 cursor-default flex-col items-center rounded-3xl bg-white p-4 shadow-md"
        >
            <MdOutlineShoppingCart className="text-2xl text-violet-600" />
            <div className="my-3 h-0.5 w-full rounded-xl bg-violet-200 px-2"></div>
            {status === 'authenticated' ? (
                cartIdx !== -1 &&
                carrinhoState.carrinhos[cartIdx].carrinhoProdutos.length > 0 ? (
                    carrinhoState.carrinhos[cartIdx].carrinhoProdutos.map(
                        (produto, idx) => {
                            const imgCapaIdx = produto.produto_imagem.findIndex(
                                (img) => img.img_ordem === 1,
                            );

                            return (
                                <div
                                    key={idx}
                                    className="flex w-full flex-col items-center"
                                >
                                    <div className="flex w-full justify-between">
                                        <div className="mr-4 flex w-2/5 items-center justify-center">
                                            <img
                                                className="h-20 w-20 rounded-2xl object-cover"
                                                src={
                                                    produto.produto_imagem[
                                                        imgCapaIdx
                                                    ].img_link
                                                }
                                            />
                                        </div>

                                        <div className="flex w-3/5 flex-col">
                                            <h2 className="text-md mb-2 overflow-hidden text-ellipsis whitespace-nowrap text-violet-900">
                                                {produto.prod_nome}
                                            </h2>
                                            <div className="flex items-center">
                                                <h1 className="text-md mr-2 text-violet-600">
                                                    R$
                                                    {parseFloat(
                                                        produto.prod_preco.toString(),
                                                    ).toFixed(2)}
                                                </h1>
                                                <span className="text-sm text-violet-400">
                                                    x{produto.prod_qtdCarrinho}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="my-3 h-0.5 w-10 rounded-2xl bg-violet-100"></div>
                                </div>
                            );
                        },
                    )
                ) : (
                    <span className="text-md mt-2 mb-6 text-violet-900">
                        Ainda não há produtos no carrinho!
                    </span>
                )
            ) : (
                <div className="flex flex-col items-center">
                    <span className="text-md mt-2 mb-6 text-violet-900">
                        Faça{' '}
                        <span
                            onClick={() =>
                                Router.push({
                                    pathname: '/Login',
                                    query: `from=${Router.asPath}`,
                                })
                            }
                            className="text-md cursor-pointer text-violet-600 underline"
                        >
                            Login
                        </span>{' '}
                        para acessar o carrinho!
                    </span>
                </div>
            )}
            {status === 'authenticated' && (
                <button className="text-md rounded-full border border-violet-600 bg-violet-600 p-3 text-white">
                    Ver carrinho
                </button>
            )}
        </motion.div>
    );
};

export default CarrinhoPreview;
