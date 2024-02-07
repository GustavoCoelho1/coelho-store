import { ProdutoFavoritado } from '@prisma/client';
import { iCliente } from './Cliente';
import { iProduto } from './Produto';

export interface iProdutoFavoritado extends ProdutoFavoritado {
    produto: iProduto;
    cliente: iCliente;
}
