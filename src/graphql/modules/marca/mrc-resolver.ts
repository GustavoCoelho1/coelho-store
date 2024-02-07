import { convertToObject } from 'typescript';
import { PrismaContext } from '../../context';

export default {
    Query: {
        allMarcas: async (_parent, _args, { prismaClient }: PrismaContext) => {
            return await prismaClient.marca
                .findMany()
                .finally(async () => await prismaClient.$disconnect());
        },

        marcaById: async (_parent, args, { prismaClient }: PrismaContext) => {
            return await prismaClient.marca
                .findUnique({
                    where: {
                        marca_cod: args.id,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        marcasByName: async (
            _parent,
            { name },
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.marca
                .findMany({
                    take: 10, //Limite de 10 produtos

                    where: {
                        marca_nome: { contains: name, mode: 'insensitive' },
                    },

                    select: {
                        marca_cod: true,
                        marca_nome: true,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },
    },

    Mutation: {
        createMarca: async (_parent, args, { prismaClient }: PrismaContext) => {
            const marcaExiste = await prismaClient.marca.findFirst({
                where: {
                    marca_nome: args.data.nome,
                },
            });

            if (!marcaExiste) {
                return await prismaClient.marca
                    .create({
                        data: {
                            marca_nome: args.data.nome,
                        },
                    })
                    .finally(async () => await prismaClient.$disconnect());
            } else {
                console.log(marcaExiste);
                return new Error('A marca inserida já existe');
            }
        },

        updateMarca: async (_parent, args, { prismaClient }: PrismaContext) => {
            return await prismaClient.marca
                .update({
                    where: {
                        marca_cod: args.id,
                    },

                    data: {
                        marca_nome: args.data.nome,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        deleteMarca: async (_parent, args, { prismaClient }: PrismaContext) => {
            let del = true;

            await prismaClient.marca
                .delete({
                    where: {
                        marca_cod: args.id,
                    },
                })
                .catch((err) => {
                    del = false;
                })
                .finally(async () => await prismaClient.$disconnect());

            return del;
        },
    },

    Marca: {
        produtos: async (parent, _args, { prismaClient }: PrismaContext) => {
            return await prismaClient.produto.findMany({
                where: {
                    marca_cod_fk: parent.marca_cod,
                },
            });
        },
    },
};
