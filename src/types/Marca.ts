import { Marca } from '@prisma/client';
import { iProduto } from './Produto';

export interface iMarca extends Marca {
    produtos: iProduto[];
}
