import { ClienteEndereco } from '@prisma/client';
import { iCliente } from './Cliente';
import { iEndereco } from './Endereco';

export interface iClienteEndereco extends ClienteEndereco {
    cliente: iCliente;
    endereco: iEndereco;
}
