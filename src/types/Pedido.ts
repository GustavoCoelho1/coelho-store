import { Pedido } from '@prisma/client';
import { iCliente } from './Cliente';
import { iItemPedido } from './ItemPedido';

export interface iPedido extends Pedido {
    cliente: iCliente;
    item_pedido: iItemPedido[];
}
