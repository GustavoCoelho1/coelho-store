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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.prodCard}
        >
            <div
                onClick={() => Router.push(`/produtos/${produto.prod_cod}`)}
                className="flex flex-col w-full h-full"
            >
                <img
                    className={`h-40 object-contain self-center rounded-xl`}
                    src={produto.produto_imagem[imgCapaIdx].img_link}
                    alt=""
                />

                <h4 className="mt-4 mb-1 font-bold text-center text-md text-violet-900">
                    {produto.prod_nome}
                </h4>

                <div className="mb-3 flex flex-col justify-center">
                    <span className="text-sm text-center mr-2 rounded-xl text-violet-400">
                        {produto.marca.marca_nome}
                    </span>
                </div>

                <div className="w-full flex items-center justify-center pt-3 border-t-2 border-violet-100">
                    <motion.span
                        animate={isHover ? 'left' : 'center'}
                        variants={{
                            center: { x: 60, transition: { delay: 0.5 } },
                            left: { x: 0 },
                        }}
                        className="w-1/2 text-lg text-violet-600"
                    >
                        {'R$' +
                            parseFloat(produto.prod_preco.toString()).toFixed(
                                2,
                            )}
                    </motion.span>

                    <div className="w-1/2 flex align-center justify-end">
                        <motion.button
                            variants={buttonsVariant}
                            animate={buttonsAnimate}
                            whileHover={{ scale: 1.05 }}
                            className="w-10 h-10 flex items-center justify-center text-lg text-white bg-violet-600 p-2 rounded-full mr-1"
                        >
                            <BiHeart title="Favoritar produto" />{' '}
                        </motion.button>

                        <motion.button
                            variants={buttonsVariant}
                            animate={buttonsAnimate}
                            whileHover={{ scale: 1.05 }}
                            className="w-10 h-10 flex items-center justify-center text-lg text-white bg-violet-600 p-2 rounded-full"
                            onClick={(e) => {
                                e.stopPropagation(); /* handleAddProdutoCarrinho(produto)*/
                            }}
                        >
                            <MdAddShoppingCart title="Adicionar ao carrinho" />{' '}
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.li>
    );
};

const styles = {
    prodCard: `
        w-60 m-6 p-4
        flex flex-col
        rounded-2xl bg-white shadow-lg shadow-violet-900/25
        cursor-pointer`,
};

export default ProdutoCard;
