export interface iUsuario {
    nome: string;
    email: string;
    senha: string;
}

export interface iCliente {
    nome: string;
    idade: number;
    celular: string;
}

export interface iEndereco {
    cep: string;
    bairro: string;
    rua: string;
    ruanum: number;
    cidade: string;
    estado: string;
}

export interface iCadastroDataProps {
    usuario: iUsuario;
    cliente: iCliente;
    endereco: iEndereco;
}
