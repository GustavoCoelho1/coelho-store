import { PrismaContext } from '../../context';

export default {
    Query: {
        allClientes: async (
            _parent,
            _args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.cliente
                .findMany()
                .finally(async () => await prismaClient.$disconnect());
        },

        clienteById: async (
            _parent,
            { id },
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.cliente
                .findUnique({
                    where: {
                        cli_cod: id,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        clienteByUserId: async (
            _parent,
            { id },
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.cliente
                .findFirst({
                    where: {
                        usuario: {
                            user_cod: id,
                        },
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        clientesByName: async (
            _parent,
            { name },
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.cliente
                .findMany({
                    where: {
                        cli_nome: { contains: name, mode: 'insensitive' },
                    },

                    select: {
                        cli_cod: true,
                        cli_nome: true,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },
    },

    Mutation: {
        createCliente: async (
            _parent,
            { data },
            { prismaClient }: PrismaContext,
        ) => {
            const celularExiste = await prismaClient.cliente.findFirst({
                where: {
                    cli_celular: data.celular,
                },
            });

            if (celularExiste) {
                return new Error('O celular informado já foi cadastrado!');
            }

            return await prismaClient.cliente
                .create({
                    data: {
                        cli_nome: data.nome,
                        cli_celular: data.celular,
                        cli_idade: data.idade,
                        user_cod_fk: data.user_cod_fk,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        updateCliente: async (
            _parent,
            args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.cliente
                .update({
                    where: {
                        cli_cod: args.id,
                    },

                    data: {
                        cli_nome: args.data.nome,
                        cli_celular: args.data.celular,
                        cli_idade: args.data.idade,
                        user_cod_fk: args.data.user_cod_fk,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        deleteCliente: async (
            _parent,
            args,
            { prismaClient }: PrismaContext,
        ) => {
            let del = true;

            await prismaClient.cliente
                .delete({
                    where: {
                        cli_cod: args.id,
                    },
                })
                .catch((err) => {
                    del = false;
                })
                .finally(async () => await prismaClient.$disconnect());

            return del;
        },
    },

    Cliente: {
        //O nome é Cliente porque no meu schema do module "cliente" eu tenho um type do tipo Cliente, e aqui estou basicamente setando o que ele deve retornar quanndo a propriedade cli_user (que indica de qual user é esse usuário) é invocada, basicamente eu mando ele dar um retorno do usuário onde código do usuário for igual a chave estrangeira contida na minha tabela de Cliente
        usuario: async (parent, _args, { prismaClient }: PrismaContext) => {
            return await prismaClient.usuario.findUnique({
                where: {
                    user_cod: parent.user_cod_fk,
                },
            });
        },

        pedidos: async (parent, _args, { prismaClient }: PrismaContext) => {
            return await prismaClient.pedido.findMany({
                where: {
                    cli_cod_fk: parent.cli_cod,
                },
            });
        },

        cliente_endereco: async (
            parent,
            _args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.clienteEndereco.findMany({
                where: {
                    cli_cod_fk: parent.cli_cod,
                },
            });
        },
    },
};
