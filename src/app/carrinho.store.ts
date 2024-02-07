import { createSlice } from '@reduxjs/toolkit';
import { iProduto } from '../types/Produto';

export type CarrinhoType = {
    id: string;
    carrinhoProdutos: Array<iProdutoCarrinho>;
    carrinhoQtdTotal: number;
    carrinhoValorTotal: number;
};

export interface iProdutoCarrinho extends iProduto {
    prod_qtdCarrinho: number;
}

export interface iCarrinhoState {
    carrinhos: Array<CarrinhoType>;
}

interface iAddProdutoCarrinhoArgs {
    payload: {
        produto: iProduto;
        userId: string;
    };
}

interface iSetQtdProdutoArgs {
    payload: {
        qtd: number;
        productId: string;
        userId: string;
    };
}

const initialState = {
    carrinhos: [],
} as iCarrinhoState;

const carrinhoSlice = createSlice({
    name: 'carrinhoCompra',
    initialState,
    reducers: {
        addProductInCart(
            state,
            { payload: { produto, userId } }: iAddProdutoCarrinhoArgs,
        ) {
            //action.payload nesse caso vai receber um produto como um parâmetro
            let cartIdx = state.carrinhos.findIndex(
                (item) => item.id === userId,
            );

            if (cartIdx !== -1) {
                const prodIdx = state.carrinhos[
                    cartIdx
                ].carrinhoProdutos.findIndex(
                    (item) => item.prod_cod === produto.prod_cod,
                );

                if (prodIdx >= 0) {
                    //Aqui nós identificicamos se no carrinho já há um produto com o mesmo código do novo produto que está sendo inserido, se sim ele não vai gerar um novo estado desse produto, mas sim incrementar na sua quantidade total dentro do carrinho
                    state.carrinhos[cartIdx].carrinhoProdutos[
                        prodIdx
                    ].prod_qtdCarrinho += 1;
                } else {
                    const prodTemplate = { ...produto, prod_qtdCarrinho: 1 }; //Aqui setamos uma nova propriedade ao produto, que só existirá aqui, no front-end, que determinará o quanto de um produto há no carrinho
                    state.carrinhos[cartIdx].carrinhoProdutos.push(
                        prodTemplate,
                    );
                }
            } else {
                const prodTemplate = { ...produto, prod_qtdCarrinho: 1 };

                const newCarrinho = {
                    id: userId,
                    carrinhoProdutos: [prodTemplate],
                    carrinhoQtdTotal: 0,
                    carrinhoValorTotal: 0,
                } as CarrinhoType;

                state.carrinhos.push(newCarrinho);

                cartIdx = state.carrinhos.findIndex(
                    (item) => item.id === userId,
                );
            }

            const newQtd = state.carrinhos[cartIdx].carrinhoProdutos.length;
            let newValorTotal = 0;

            state.carrinhos[cartIdx].carrinhoProdutos.forEach((produto) => {
                const prodTotal =
                    parseFloat(produto.prod_preco.toString()) *
                    produto.prod_qtdCarrinho;

                newValorTotal += prodTotal;
            });

            state.carrinhos[cartIdx].carrinhoQtdTotal = newQtd;
            state.carrinhos[cartIdx].carrinhoValorTotal = newValorTotal;
        },

        updateProductQnt(
            state,
            { payload: { qtd, productId, userId } }: iSetQtdProdutoArgs,
        ) {
            let cartIdx = state.carrinhos.findIndex(
                (item) => item.id === userId,
            );

            let prodIdx = state.carrinhos[cartIdx].carrinhoProdutos.findIndex(
                (item) => item.prod_cod === productId,
            );

            state.carrinhos[cartIdx].carrinhoProdutos[
                prodIdx
            ].prod_qtdCarrinho = qtd;
        },

        removeProductInCart(state, { payload: { userId, productId } }) {
            const cartIdx = state.carrinhos.findIndex(
                (item) => item.id === userId,
            );

            const prodIdx = state.carrinhos[cartIdx].carrinhoProdutos.findIndex(
                (item) => item.prod_cod === productId,
            );

            state.carrinhos[cartIdx].carrinhoProdutos.splice(prodIdx, 1);
        },

        clearCart(state, { payload: userId }) {
            console.log(userId);

            const cartIdx = state.carrinhos.findIndex(
                (item) => item.id === userId,
            );
            state.carrinhos[cartIdx].carrinhoProdutos = [];
        },
    },
});

export const {
    addProductInCart,
    removeProductInCart,
    updateProductQnt,
    clearCart,
} = carrinhoSlice.actions;

export default carrinhoSlice.reducer;
