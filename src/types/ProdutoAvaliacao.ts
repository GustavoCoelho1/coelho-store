import { ProdutoAvaliacao } from '@prisma/client';
import { iUsuario } from './Usuario';
import { iProduto } from './Produto';

export interface iProdutoAvaliacao extends ProdutoAvaliacao {
    produto: iProduto;
    usuario: iUsuario;
}
