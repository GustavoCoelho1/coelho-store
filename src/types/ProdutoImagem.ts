import { ProdutoImagem } from '@prisma/client';
import { iProduto } from './Produto';

export interface iProdutoImagem extends ProdutoImagem {
    produto: iProduto;
}
