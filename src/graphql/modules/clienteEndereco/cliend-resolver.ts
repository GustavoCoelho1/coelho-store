import { convertToObject } from 'typescript';
import { PrismaContext } from '../../context';

export default {
    Query: {
        allClientesEnderecos: async (
            _parent,
            _args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.clienteEndereco
                .findMany()
                .finally(async () => await prismaClient.$disconnect());
        },
    },

    Mutation: {
        createClienteEndereco: async (
            _parent,
            args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.clienteEndereco
                .create({
                    data: {
                        cli_cod_fk: args.data.cli_cod_fk,
                        end_cod_fk: args.data.end_cod_fk,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },
        updateClienteEndereco: async (
            _parent,
            args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.clienteEndereco
                .update({
                    where: {
                        cliend_cod: args.id,
                    },

                    data: {
                        cli_cod_fk: args.data.cli_cod_fk,
                        end_cod_fk: args.data.end_cod_fk,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        deleteClienteEndereco: async (
            _parent,
            args,
            { prismaClient }: PrismaContext,
        ) => {
            let del = true;

            await prismaClient.clienteEndereco
                .delete({
                    where: {
                        cliend_cod: args.id,
                    },
                })
                .catch((err) => {
                    del = false;
                })
                .finally(async () => await prismaClient.$disconnect());

            return del;
        },
    },

    ClienteEndereco: {
        cliente: async (parent, _args, { prismaClient }: PrismaContext) => {
            return await prismaClient.cliente.findUnique({
                where: {
                    cli_cod: parent.cli_cod_fk,
                },
            });
        },

        endereco: async (parent, _args, { prismaClient }: PrismaContext) => {
            return await prismaClient.endereco.findUnique({
                where: {
                    end_cod: parent.end_cod_fk,
                },
            });
        },
    },
};
