import type { GetServerSideProps, NextPage } from 'next';
import { useState, useEffect, useDebugValue } from 'react';
import { motion, Variants } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import {
    toast,
    ToastContainer,
    ToastContainerProps,
    ToastPosition,
} from 'react-toastify';
import { iProduto } from '../../types/Produto';
import Slider, { Settings } from 'react-slick';
import { MdAddShoppingCart } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import FavoriteButton from '../../components/produtos/FavoriteButton';
import StartRating from '../../components/common/ui/StarRating';
import AddProdutoToCarrinho from '../../components/produtos/AddProductToCart';
import prismaClient from 'libs/prisma';
import Reviews from 'components/produtos/Reviews';
import Router from 'next/router';
import ProdutosList from 'components/common/ui/ProdutosList';
import { BiCategory } from 'react-icons/bi';

interface Props {
    pageData: string;
}

const productPageData = async (id) => {
    const product = await prismaClient.produto
        .findUnique({
            where: {
                prod_cod: id,
            },
            include: {
                produto_imagem: true,
                produto_avaliacoes: true,
                marca: true,
                categoria: true,
                produto_favoritado: true,
            },
        })
        .catch((err) => {
            throw new Error('O código informado não é válido!');
        });

    const similarProducts = await prismaClient.produto
        .findMany({
            where: {
                cat_cod_fk: product.cat_cod_fk,
                NOT: {
                    prod_cod: product.prod_cod,
                },
            },
            include: {
                produto_imagem: true,
                marca: true,
            },
        })
        .catch((err) => {
            throw new Error('Houve um erro ao carregar dados da página!');
        })
        .finally(() => prismaClient.$disconnect());

    return { product, similarProducts };
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { params } = ctx;

    const req = await productPageData(params.id);

    const pageData = JSON.stringify(req);

    console.log(pageData);

    return {
        props: {
            pageData,
        },
    };
};

const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
} as Settings;

const toastContainerSettings = {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: 'light',
} as ToastContainerProps;

const Produto: NextPage<Props> = ({ pageData }) => {
    const data = JSON.parse(pageData);
    const produto = data.product as iProduto;
    const produtosSimilares = data.similarProducts as iProduto[];

    const session = useSession();
    const [userId, setUserId] = useState('');
    const isLogged = userId !== '';

    const [avaliacao, setSetAvaliacaoMedia] = useState({
        quantidade: 0,
        media: 0,
    });

    const [addToCarrinhoVisible, setAddToCarrinhoVisible] = useState(false);
    const [reviewsVisible, setReviewsVisible] = useState(false);

    const imgCapaIdx = produto.produto_imagem.findIndex(
        (img) => img.img_ordem === 1,
    );

    const [activeImage, setActiveImage] = useState(
        produto.produto_imagem[imgCapaIdx].img_link,
    );

    const [imgLoading, setImgLoading] = useState(false);

    const mainImgVariants = {
        loading: {
            opacity: 0,
            transition: {
                duration: 0.3,
            },
        },
        loaded: {
            opacity: 1,
            transition: {
                duration: 0.3,
            },
        },
    } as Variants;

    const favButtonConfig = {
        className: 'top-6 right-6 p-6 text-xl',
        productId: produto.prod_cod,
        user: {
            id: userId,
            isLogged,
        },
    };

    const addProdutoCarrinhoConfig = {
        produto: produto,
        user: { id: userId, isLogged },
        setVisible: setAddToCarrinhoVisible,
        visible: addToCarrinhoVisible,
    };

    const reviewsConfig = {
        produto: produto,
        media: avaliacao.media,
        setVisible: setReviewsVisible,
        visible: reviewsVisible,
    };

    useEffect(() => {
        if (
            produto.produto_avaliacoes &&
            produto.produto_avaliacoes.length > 0
        ) {
            let avaliacaoTotal = 0;

            produto.produto_avaliacoes.forEach((avaliacao) => {
                avaliacaoTotal += avaliacao.avaliacao_estrelas;
            });

            const avaliacao =
                avaliacaoTotal / produto.produto_avaliacoes.length;

            setSetAvaliacaoMedia({
                quantidade: produto.produto_avaliacoes.length,
                media: avaliacao,
            });
        }
    }, []);

    useEffect(() => {
        if (session.status === 'authenticated') {
            setUserId(session.data.user.id);
        }
    }, [session]);

    const switchMainImg = (img) => {
        if (activeImage !== img.img_link && imgLoading !== true) {
            setImgLoading(true);

            setTimeout(() => {
                setActiveImage(img.img_link);
                setTimeout(() => setImgLoading(false), 100);
            }, 300);
        }
    };

    return (
        <>
            <Head>
                <title>Coelhão Store</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <motion.main
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex min-h-screen w-screen flex-col items-center justify-start bg-violet-200 sm:py-10"
            >
                <div className="container flex w-full max-w-[1200px] flex-col items-center justify-center gap-5">
                    <div className="relative flex w-full flex-col items-center justify-center bg-white p-8 sm:w-11/12 sm:rounded-xl md:flex-row">
                        <FavoriteButton {...favButtonConfig} />

                        <div className="mb-6 w-full md:mb-0 md:w-1/2 md:pr-6">
                            <motion.img
                                initial={false}
                                animate={imgLoading ? 'loading' : 'loaded'}
                                variants={mainImgVariants}
                                className="hidden h-full max-h-[400px] w-full self-center rounded-xl object-contain md:flex md:h-4/5"
                                src={activeImage}
                                alt=""
                            />

                            <div className="block w-full md:hidden">
                                <Slider {...sliderSettings}>
                                    {produto.produto_imagem.map((img, idx) => {
                                        const p =
                                            idx === 0
                                                ? 'pr-3'
                                                : idx ===
                                                  produto.produto_imagem
                                                      .length -
                                                      1
                                                ? 'pl-3'
                                                : 'p-0';
                                        return (
                                            <div
                                                key={'prod-slider-' + idx}
                                                className={`h-[400px] w-full cursor-pointer rounded-xl p-3 ${p}`}
                                            >
                                                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border">
                                                    <img
                                                        className="h-full w-full rounded-xl object-contain"
                                                        src={img.img_link}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </Slider>
                            </div>
                        </div>
                        <div className="flex h-full w-full flex-col items-center self-start pl-0 md:w-1/2 md:pl-8">
                            <div className="mb-6 hidden w-full md:block">
                                <Slider {...sliderSettings}>
                                    {produto.produto_imagem.map((img, idx) => {
                                        const p =
                                            idx === 0
                                                ? 'pr-3'
                                                : idx ===
                                                  produto.produto_imagem
                                                      .length -
                                                      1
                                                ? 'pl-3'
                                                : 'p-0';
                                        return (
                                            <motion.div
                                                key={idx}
                                                onClick={() =>
                                                    switchMainImg(img)
                                                }
                                                className={`h-48 w-full cursor-pointer rounded-xl p-3 ${p} sm:h-48`}
                                            >
                                                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border">
                                                    <motion.img
                                                        whileHover={{
                                                            scale: 1.2,
                                                        }}
                                                        className="h-48 w-full rounded-xl object-contain"
                                                        src={img.img_link}
                                                    />
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </Slider>
                            </div>

                            <h3 className="mb-2 mt-4 text-center text-violet-500 md:mb-2">
                                {produto.marca.marca_nome}
                            </h3>
                            <h2 className="mb-3 text-center text-lg font-bold uppercase text-violet-900 xl:text-xl">
                                {produto.prod_nome}
                            </h2>

                            <button
                                onClick={() => setReviewsVisible(true)}
                                className="flex items-center justify-center"
                                title={avaliacao.media.toString()}
                            >
                                <StartRating
                                    color="text-violet-600"
                                    size={'text-xl'}
                                    stars={avaliacao.media}
                                />
                                <span className="text-violet-400">
                                    ({avaliacao.quantidade})
                                </span>
                            </button>

                            <h1 className="mb-6 mt-6 text-center text-2xl text-violet-500">
                                {'R$' +
                                    parseFloat(
                                        produto.prod_preco.toString(),
                                    ).toFixed(2)}
                            </h1>

                            <span className="mb-5 mt-2 text-justify text-violet-900">
                                {produto.prod_descricao}
                            </span>

                            <div className="mt-4 flex w-full items-center justify-center">
                                <button
                                    onClick={() =>
                                        setAddToCarrinhoVisible(true)
                                    }
                                    className="text-md flex w-11/12 max-w-[400px] items-center justify-center gap-4 self-end rounded-full bg-violet-500 px-4 py-4 text-white"
                                >
                                    <MdAddShoppingCart
                                        className="text-lg"
                                        title="Adicionar produto ao carrinho"
                                    />
                                    <span>Adicionar ao carrinho</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {produtosSimilares.length > 0 && (
                        <div className="relative flex w-full flex-col justify-center gap-5 bg-white p-8 sm:w-11/12 sm:rounded-xl">
                            <div className="flex items-center gap-2 text-violet-800">
                                <BiCategory className="text-lg" />
                                <h1 className="font-bold">
                                    Produtos similares
                                </h1>
                            </div>
                            <ProdutosList
                                data={produtosSimilares}
                            ></ProdutosList>
                        </div>
                    )}
                </div>

                <ToastContainer {...toastContainerSettings} />
            </motion.main>

            <AddProdutoToCarrinho {...addProdutoCarrinhoConfig} />
            <Reviews {...reviewsConfig}></Reviews>
        </>
    );
};

export default Produto;
