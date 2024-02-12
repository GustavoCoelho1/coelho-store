import { gql, useMutation } from '@apollo/client';
import CartContext from 'contexts/CartContext';
import Router from 'next/router';
import { useContext, useEffect } from 'react';
import { MoonLoader } from 'react-spinners';
import { useState } from 'react';
import { iProdutoImagem } from 'types/ProdutoImagem';
import ErrorMessage from './ErrorMessage';
import { useSession } from 'next-auth/react';
import CheckoutWarning from '../CheckoutWarning';

const CRIAR_CHECKOUT = gql`
    mutation ($data: iCheckout) {
        CRIAR_CHECKOUT: createStripeCheckout(data: $data)
    }
`;

const CheckoutButton = () => {
    const {
        data: { user },
    } = useSession();
    const {
        address,
        cartTotal,
        checkedProducts,
        setCheckoutLink,
        setCheckoutWarningVisible,
    } = useContext(CartContext);

    const [createCheckout, { loading, error, reset }] =
        useMutation(CRIAR_CHECKOUT);

    const [errorVisible, setErrorVisible] = useState(false);

    const handleClick = async () => {
        if (address.id != '' && cartTotal != 0 && checkedProducts.length > 0) {
            const prodForCheckout = checkedProducts.map((item) => {
                const imgForCheckout = item.produto_imagem.map((imgItem) => {
                    return {
                        img_cod: imgItem.img_cod,
                        img_link: imgItem.img_link,
                        img_ordem: imgItem.img_ordem,
                    } as iProdutoImagem;
                });

                return {
                    prod_cod: item.prod_cod,
                    prod_nome: item.prod_nome,
                    prod_preco: Number(item.prod_preco),
                    prod_qtdCarrinho: item.prod_qtdCarrinho,
                    prod_descricao: item.prod_descricao,
                    produto_imagem: imgForCheckout,
                };
            });

            console.log(prodForCheckout);

            try {
                const { data, errors } = await createCheckout({
                    variables: {
                        data: {
                            userId: user.id,
                            produtos: prodForCheckout,
                            endereco: address,
                            total: cartTotal,
                        },
                    },
                });

                if (!errors) {
                    setCheckoutLink(data.CRIAR_CHECKOUT);
                    setCheckoutWarningVisible(true);
                }
            } catch (err) {
                console.log(err);
                setErrorVisible(true);
            }
        }
    };

    return (
        <>
            <button
                onClick={() => handleClick()}
                className={`flex w-full items-center justify-center rounded-3xl px-4 py-3 text-white ${
                    checkedProducts.length > 0 && address.id != ''
                        ? 'bg-violet-600'
                        : 'bg-gray-400'
                }`}
                disabled={
                    checkedProducts.length > 0 && address.id != '' && !error
                        ? false
                        : true
                }
            >
                {loading ? (
                    <MoonLoader color="white" size={20} />
                ) : error ? (
                    'Algo deu errado!'
                ) : (
                    'Continuar a compra'
                )}
            </button>

            <ErrorMessage
                modalVisible={errorVisible}
                setModalVisible={setErrorVisible}
                resetForm={reset}
            />
        </>
    );
};

export default CheckoutButton;
