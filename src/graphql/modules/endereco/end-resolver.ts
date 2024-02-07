import { convertToObject } from 'typescript';
import { PrismaContext } from '../../context';

export default {
    Query: {
        allEnderecos: async (
            _parent,
            _args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.endereco
                .findMany()
                .finally(async () => await prismaClient.$disconnect());
        },

        enderecoById: async (
            _parent,
            args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.endereco
                .findUnique({
                    where: {
                        end_cod: args.id,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },
    },

    Mutation: {
        createEndereco: async (
            _parent,
            args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.endereco
                .create({
                    data: {
                        end_cep: args.data.cep,
                        end_bairro: args.data.bairro,
                        end_cidade: args.data.cidade,
                        end_estado: args.data.estado,
                        end_rua: args.data.rua,
                        end_ruanum: args.data.ruanum,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },
        updateEndereco: async (
            _parent,
            args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.endereco
                .update({
                    where: {
                        end_cod: args.id,
                    },

                    data: {
                        end_cep: args.data.cep,
                        end_bairro: args.data.bairro,
                        end_cidade: args.data.cidade,
                        end_estado: args.data.estado,
                        end_rua: args.data.rua,
                        end_ruanum: args.data.ruanum,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        deleteEndereco: async (
            _parent,
            args,
            { prismaClient }: PrismaContext,
        ) => {
            let del = true;

            await prismaClient.endereco
                .delete({
                    where: {
                        end_cod: args.id,
                    },
                })
                .catch((err) => {
                    del = false;
                })
                .finally(async () => await prismaClient.$disconnect());

            return del;
        },
    },

    Endereco: {
        cliente_endereco: async (
            parent,
            _args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.clienteEndereco.findMany({
                where: {
                    end_cod_fk: parent.end_cod,
                },
            });
        },
    },
};
