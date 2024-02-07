import { useDispatch } from 'react-redux';
import { iProduto } from '../../../types/Produto';
import { addProductInCart } from '../../../app/carrinho.store';

const AddProdutoButton = ({ onClick, produto, qtd, user }) => {
    const dispatch = useDispatch();

    const handleAddProdutoToCarrinho = (
        produto: iProduto,
        qnt: number,
        { id },
    ) => {
        for (let x = 1; x <= qnt; x++) {
            dispatch(addProductInCart({ produto, userId: id }));
        }

        onClick();
    };

    return (
        <button
            onClick={() => handleAddProdutoToCarrinho(produto, qtd, user)}
            className="w-11/12 self-end rounded-full bg-violet-500 py-3 px-2 text-lg text-white sm:text-xl"
        >
            Adicionar
        </button>
    );
};

export default AddProdutoButton;
