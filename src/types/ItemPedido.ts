import { ItemPedido } from '@prisma/client';
import { iPedido } from './Pedido';
import { iProduto } from './Produto';

export interface iItemPedido extends ItemPedido {
    produto: iProduto;
    pedido: iPedido;
}
