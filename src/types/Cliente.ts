import { Cliente } from '@prisma/client';
import { iClienteEndereco } from './ClienteEndereco';
import { iPedido } from './Pedido';
import { iProdutoAvaliacao } from './ProdutoAvaliacao';
import { iProdutoFavoritado } from './ProdutoFavoritado';

export interface iCliente extends Cliente {
    pedidos: iPedido[];
    cliente_endereco: iClienteEndereco[];
    produto_favoritado: iProdutoFavoritado[];
    produto_avaliacao: iProdutoAvaliacao[];
}
