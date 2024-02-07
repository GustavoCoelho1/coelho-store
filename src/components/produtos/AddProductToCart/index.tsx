import { useState, useEffect } from 'react';

import { useSession } from 'next-auth/react';

import Modal from '../../common/ui/Modal';
import { motion } from 'framer-motion';
import { BiArrowBack } from 'react-icons/bi';
import InputNumber from '../../common/form/InputNumber';
import { MdAddShoppingCart } from 'react-icons/md';
import { iProduto } from '../../../types/Produto';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app';
import Router, { useRouter } from 'next/router';
import AddProdutoButton from './AddProdutoButton';

interface AddProdutoToCarrinhoModalProps {
    user: {
        id?: string;
        isLogged: boolean;
    };
    produto: iProduto;
    visible: boolean;
    setVisible: (value: boolean) => void;
}

const AddProdutoToCarrinhoModal = ({
    user,
    produto,
    visible,
    setVisible,
}: AddProdutoToCarrinhoModalProps) => {
    const session = useSession();
    const router = useRouter();
    const carrinhoState = useSelector((state: RootState) => state.carrinho);

    const [qtdProdutosToAdd, setQntProdutosToAdd] = useState(1);

    const [qtdProdInCart, setQtdProdInCart] = useState(0);
    const maxQtdProduto = produto.prod_estoque - qtdProdInCart;

    const imgCapaIdx = produto.produto_imagem.findIndex(
        (img) => img.img_ordem === 1,
    );

    useEffect(() => {
        if (user.isLogged && carrinhoState.carrinhos.length > 0) {
            const cartIdx = carrinhoState.carrinhos.findIndex(
                (item) => item.id === user.id,
            );

            if (cartIdx !== -1) {
                const prodIdx = carrinhoState.carrinhos[
                    cartIdx
                ].carrinhoProdutos.findIndex(
                    (item) => item.prod_cod === produto.prod_cod,
                );

                if (prodIdx !== -1) {
                    const newQtdProdInCart =
                        carrinhoState.carrinhos[cartIdx].carrinhoProdutos[
                            prodIdx
                        ].prod_qtdCarrinho;

                    setQtdProdInCart(newQtdProdInCart);
                }
            }
        }
    }, [carrinhoState, user.isLogged]);

    useEffect(() => {
        if (visible) {
            if (session.status === 'unauthenticated') {
                setVisible(false);
                router.push({
                    pathname: '/Login',
                    query: `from=${router.asPath}`,
                });
            }

            if (qtdProdInCart > 1 && maxQtdProduto === 0) {
                setVisible(false);
                toast.error(
                    'Você atingiu a quantidade máxima disponível para este item!',
                    { autoClose: 1500, toastId: 'error-add-to-carrinho' },
                );
            }
        }
    }, [visible]);

    const onClickAddProduto = () => {
        setVisible(false);
        setQntProdutosToAdd(1);
        toast.success('O produto foi adicionado ao carrinho com sucesso!', {
            autoClose: 1500,
        });
    };

    return (
        <Modal show={visible} handleClose={() => setVisible(false)}>
            <motion.div
                whileHover={{ x: -3, scale: 1.1 }}
                onClick={() => setVisible(false)}
                className="absolute left-4 top-4 z-10 cursor-pointer"
            >
                <BiArrowBack className="text-xl text-violet-600" />
            </motion.div>

            <span className="text-4xl text-violet-600">
                <MdAddShoppingCart />
            </span>
            <h1 className="mt-2 mb-6 text-center text-xl text-violet-600">
                Adicionar ao carrinho
            </h1>
            <div className="mb-4 flex w-2/3 flex-col items-center justify-center">
                <img
                    className="mb-4 w-32 rounded-2xl object-cover"
                    src={produto.produto_imagem[imgCapaIdx].img_link}
                />
                <span className="text-md overflow-hidden text-ellipsis whitespace-nowrap font-bold uppercase text-violet-900">
                    {produto.prod_nome}
                </span>
            </div>

            <div className="mt-2 flex flex-col">
                <div
                    style={{ maxWidth: '200px' }}
                    className="relative mr-2 flex w-full flex-col items-center justify-center"
                >
                    <InputNumber
                        value={qtdProdutosToAdd}
                        setValue={setQntProdutosToAdd}
                        max={maxQtdProduto}
                    />
                    <span
                        style={{ top: '72px' }}
                        className="mt-3 mb-5 text-xs text-violet-400"
                    >
                        Disponível: {maxQtdProduto}
                    </span>
                </div>
                <div className="w-full">
                    <AddProdutoButton
                        onClick={onClickAddProduto}
                        produto={produto}
                        qtd={qtdProdutosToAdd}
                        user={user}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default AddProdutoToCarrinhoModal;
