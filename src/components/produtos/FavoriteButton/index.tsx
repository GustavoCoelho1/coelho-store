import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { motion, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import * as Atoms from './atoms';
import { gql, useMutation } from '@apollo/client';

import { useLazyQuery } from '@apollo/client';

const PRODUTO_FAVORITADO = gql`
    query ($data: iProdutoFavoritado!) {
        PRODUTO_FAVORITADO: usuarioFavoritouProduto(data: $data)
    }
`;

const FAVORITAR = gql`
    mutation ($data: iProdutoFavoritado!) {
        FAVORITAR: createProdutoFavoritado(data: $data) {
            fav_cod
        }
    }
`;

const DESFAVORITAR = gql`
    mutation ($data: iProdutoFavoritado!) {
        DESFAVORITAR: unactivateProdutoFavoritado(data: $data)
    }
`;

interface FavoriteButtonProps {
    className?: string;
    productId: string;
    user: {
        id?: string;
        isLogged: boolean;
    };
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    className,
    productId,
    user,
}) => {
    const [favButtonClicked, setFavButtonClicked] = useState(false);

    const [loadGetProdutoFavoritado] = useLazyQuery(PRODUTO_FAVORITADO, {
        variables: {
            data: {
                prod_cod_fk: productId,
                user_cod_fk: user.id,
            },
        },
    });

    const [loadFavoritar] = useMutation(FAVORITAR);
    const [loadDesfavoritar] = useMutation(DESFAVORITAR);

    const favButtonVariants = {
        show: {
            opacity: 1,
            zIndex: 10,
            transition: {
                duration: 0.3,
            },
        },
        hide: {
            opacity: 0,
            zIndex: -1,
            transition: {
                duration: 0.3,
            },
        },
    } as Variants;

    const storeFavorite = async (value: boolean) => {
        if (value) {
            loadFavoritar({
                variables: {
                    data: {
                        prod_cod_fk: productId,
                        user_cod_fk: user.id,
                    },
                },
            });
        } else {
            loadDesfavoritar({
                variables: {
                    data: {
                        prod_cod_fk: productId,
                        user_cod_fk: user.id,
                    },
                },
            });
        }
    };

    const validateProdutoFavoritado = async () => {
        const { data, error } = await loadGetProdutoFavoritado();

        if (data) {
            const response = data?.PRODUTO_FAVORITADO;

            return response;
        }

        if (error) {
            console.log('❌ Houve um erro ao consultar o produto!');
        }
    };

    useEffect(() => {
        if (user.isLogged) {
            const checkProdutoFavoritado = async () => {
                const produtoFavoritado = await validateProdutoFavoritado();

                if (produtoFavoritado) {
                    setFavButtonClicked(true);
                }
            };

            checkProdutoFavoritado();
        }
    }, [user]);

    const handleFavButtonClick = () => {
        const newValue = !favButtonClicked;

        setFavButtonClicked(newValue);

        if (user.isLogged) {
            storeFavorite(newValue);
        }
    };

    return (
        <Atoms.Container
            className={className ? className : undefined}
            $clicked={favButtonClicked}
            onClick={() => handleFavButtonClick()}
        >
            <div className="relative flex w-full items-center justify-center">
                <BsHeart className="absolute" title="Favoritar produto" />

                <motion.div
                    initial={false}
                    animate={favButtonClicked ? 'show' : 'hide'}
                    variants={favButtonVariants}
                    className="absolute z-10"
                >
                    <BsHeartFill title="Desfavoritar produto" />
                </motion.div>
            </div>
        </Atoms.Container>
    );
};

export default FavoriteButton;
