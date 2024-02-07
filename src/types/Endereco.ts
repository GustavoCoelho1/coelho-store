import { Endereco } from '@prisma/client';
import { iClienteEndereco } from './ClienteEndereco';

export interface iEndereco extends Endereco {
    cliente_endereco: iClienteEndereco[];
}
