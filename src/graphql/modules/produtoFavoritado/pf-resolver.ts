import { PrismaContext } from '../../context';

export default {
    Query: {
        allProdutosFavoritados: async (
            _parent,
            _args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.produtoFavoritado
                .findMany()
                .finally(async () => await prismaClient.$disconnect());
        },

        usuarioFavoritouProduto: async (
            _parent,
            { prod_cod_fk, user_cod_fk },
            { prismaClient }: PrismaContext,
        ) => {
            const response = await prismaClient.produtoFavoritado
                .findFirst({
                    where: {
                        prod_cod_fk,
                        user_cod_fk,
                        fav_active: true,
                    },

                    select: {
                        fav_cod: true,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());

            return response ? true : false;
        },

        usuarioAllProdutosFavoritados: async (
            _parent,
            { user_cod },
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.produtoFavoritado
                .findMany({
                    where: {
                        user_cod_fk: user_cod,
                        fav_active: true,
                    },

                    select: {
                        fav_cod: true,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        produtoAllFavoritos: async (
            _parent,
            { prod_cod },
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.produtoFavoritado
                .findMany({
                    where: {
                        prod_cod_fk: prod_cod,
                        fav_active: true,
                    },

                    select: {
                        fav_cod: true,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },
    },

    Mutation: {
        createProdutoFavoritado: async (
            _parent,
            { data: { prod_cod_fk, user_cod_fk } },
            { prismaClient }: PrismaContext,
        ) => {
            const favExiste = await prismaClient.produtoFavoritado.findFirst({
                where: {
                    prod_cod_fk,
                    user_cod_fk,
                },
            });

            if (favExiste) {
                if (favExiste.fav_active !== true) {
                    return await prismaClient.produtoFavoritado
                        .update({
                            where: {
                                fav_cod: favExiste.fav_cod,
                            },
                            data: {
                                fav_active: true,
                            },
                        })
                        .finally(async () => await prismaClient.$disconnect());
                } else {
                    return favExiste;
                }
            } else {
                return await prismaClient.produtoFavoritado
                    .create({
                        data: {
                            prod_cod_fk,
                            user_cod_fk,
                        },
                    })
                    .finally(async () => await prismaClient.$disconnect());
            }
        },

        unactivateProdutoFavoritado: async (
            _parent,
            { data: { prod_cod_fk, user_cod_fk } },
            { prismaClient }: PrismaContext,
        ) => {
            const favorite = await prismaClient.produtoFavoritado.findFirst({
                where: {
                    prod_cod_fk,
                    user_cod_fk,
                },

                select: {
                    fav_cod: true,
                },
            });

            const response = await prismaClient.produtoFavoritado.update({
                where: {
                    fav_cod: favorite.fav_cod,
                },

                data: {
                    fav_active: false,
                },
            });

            return response ? true : false;
        },

        updateProdutoFavoritado: async (
            _parent,
            { id, data: favData },
            { prismaClient }: PrismaContext,
        ) => {
            const updateData = removeEmpty(favData);

            return await prismaClient.produtoFavoritado
                .update({
                    where: {
                        fav_cod: id,
                    },

                    data: updateData,
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        deleteProdutoFavoritado: async (
            _parent,
            { id },
            { prismaClient }: PrismaContext,
        ) => {
            let del = true;

            await prismaClient.produtoFavoritado
                .delete({
                    where: {
                        fav_cod: id,
                    },
                })
                .catch((err) => {
                    del = false;
                })
                .finally(async () => await prismaClient.$disconnect());

            return del;
        },
    },

    ProdutoFavoritado: {
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

function removeEmpty(obj) {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v != null),
    );
}
