import { easeIn } from 'animations/myAnimations';
import Router from 'next/router';
import { useState } from 'react';
import { motion } from 'framer-motion';

import { iProduto } from 'types/Produto';
import { BiHeart } from 'react-icons/bi';
import { MdAddShoppingCart } from 'react-icons/md';

interface Props {
    produto: iProduto;
}

const ProdutoCard: React.FC<Props> = ({ produto }) => {
    const [isHover, setIsHover] = useState(false);

    const buttonsVariant = {
        show: {
            opacity: 1,
            transition: {
                ease: easeIn,
                duration: 0.8,
            },
        },

        hide: {
            opacity: 0,
            transition: {
                ease: easeIn,
                duration: 0.8,
            },
        },
    };

    const buttonsAnimate = isHover ? 'show' : 'hide';
    const imgCapaIdx = produto.produto_imagem.findIndex(
        (img) => img.img_ordem === 1,
    );

    return (
        <motion.li
            onHoverStart={() => setIsHover(true)}
            onHoverEnd={() => setIsHover(false)}
            whileTap={{ scale: 0.95 }}
            className="flex w-60 cursor-pointer flex-col border border-violet-100 bg-white p-4 shadow-violet-900/25 transition duration-200 ease-out hover:translate-y-[-10px] hover:shadow-md"
        >
            <div
                onClick={() => Router.push(`/produtos/${produto.prod_cod}`)}
                className="flex h-full w-full flex-col justify-between gap-2"
            >
                <img
                    className={`h-40 self-center rounded-xl bg-[#f5f5f7] object-contain`}
                    src={produto.produto_imagem[imgCapaIdx].img_link}
                    alt=""
                />

                <h4 className="max-h-[40px] overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm font-bold text-violet-900">
                    {produto.prod_nome}
                </h4>

                <div className="flex flex-col items-center gap-2">
                    <span className="rounded-xl text-center text-sm text-violet-400">
                        {produto.marca.marca_nome}
                    </span>

                    <div className="flex w-full items-center justify-center border-t-2 border-violet-100 pt-2 ">
                        <motion.span
                            animate={isHover ? 'left' : 'center'}
                            variants={{
                                center: {
                                    x: 53,
                                    transition: { delay: 0.5, duration: 0.2 },
                                },
                                left: { x: 0 },
                            }}
                            className="w-1/2 text-center text-violet-600"
                        >
                            {'R$' +
                                parseFloat(
                                    produto.prod_preco.toString(),
                                ).toFixed(2)}
                        </motion.span>

                        <div className="align-center flex w-1/2 justify-end">
                            <motion.button
                                variants={buttonsVariant}
                                animate={buttonsAnimate}
                                whileHover={{ scale: 1.05 }}
                                className="mr-1 flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 p-2 text-white"
                            >
                                <BiHeart title="Favoritar produto" />{' '}
                            </motion.button>

                            <motion.button
                                variants={buttonsVariant}
                                animate={buttonsAnimate}
                                whileHover={{ scale: 1.05 }}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 p-2 text-white"
                                onClick={(e) => {
                                    e.stopPropagation(); /* handleAddProdutoCarrinho(produto)*/
                                }}
                            >
                                <MdAddShoppingCart title="Adicionar ao carrinho" />{' '}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.li>
    );
};

export default ProdutoCard;
