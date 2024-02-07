import { PrismaContext } from '../../context';

export default {
    Query: {
        allProdutosAvaliacoes: async (
            _parent,
            _args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.produtoAvaliacao
                .findMany()
                .finally(async () => await prismaClient.$disconnect());
        },

        produtoAvaliacoesByProdutoId: async (
            _parent,
            { id },
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.produtoAvaliacao
                .findMany({
                    where: {
                        prod_cod_fk: id,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },
    },

    Mutation: {
        createProdutoAvaliacao: async (
            _parent,
            { data: { estrelas, comentario, prod_cod_fk, user_cod_fk } },
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.produtoAvaliacao
                .create({
                    data: {
                        avaliacao_comentario: comentario,
                        avaliacao_estrelas: estrelas,
                        prod_cod_fk,
                        user_cod_fk,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        updateProdutoAvaliacao: async (
            _parent,
            { id, data: { estrelas, comentario, prod_cod_fk, user_cod_fk } },
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.produtoAvaliacao
                .update({
                    where: {
                        avaliacao_cod: id,
                    },

                    data: {
                        avaliacao_comentario: comentario,
                        avaliacao_estrelas: estrelas,
                        prod_cod_fk,
                        user_cod_fk,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        deleteProdutoAvaliacao: async (
            _parent,
            { id }: { id: string },
            { prismaClient }: PrismaContext,
        ) => {
            let deleteProdCat = true;

            await prismaClient.produtoAvaliacao
                .delete({
                    where: {
                        avaliacao_cod: id,
                    },
                })
                .catch((err) => {
                    deleteProdCat = false;
                })
                .finally(async () => await prismaClient.$disconnect());

            return deleteProdCat;
        },
    },

    ProdutoAvaliacao: {
        produto: async (parent, _args, { prismaClient }: PrismaContext) => {
            return await prismaClient.produto.findUnique({
                where: {
                    prod_cod: parent.prod_cod_fk,
                },
            });
        },

        usuario: async (parent, _args, { prismaClient }: PrismaContext) => {
            return await prismaClient.usuario.findUnique({
                where: {
                    user_cod: parent.user_cod_fk,
                },
            });
        },
    },
};
