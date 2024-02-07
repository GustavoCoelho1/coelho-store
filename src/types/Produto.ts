import { Produto } from '@prisma/client';
import { iItemPedido } from './ItemPedido';
import { iProdutoAvaliacao } from './ProdutoAvaliacao';
import { iProdutoFavoritado } from './ProdutoFavoritado';
import { iProdutoImagem } from './ProdutoImagem';
import { iMarca } from './Marca';
import { iCategoria } from './Categoria';

export interface iProduto extends Produto {
    categoria: iCategoria;
    marca: iMarca;
    item_pedido: iItemPedido[];
    produto_avaliacoes: iProdutoAvaliacao[];
    produto_favoritado: iProdutoFavoritado[];
    produto_imagem: iProdutoImagem[];
}
