import { PrismaContext } from '../../context';

export default {
    Query: {
        allCategorias: async (
            _parent,
            _args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.categoria
                .findMany()
                .finally(async () => await prismaClient.$disconnect());
        },

        categoriaById: async (
            _parent,
            args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.categoria
                .findUnique({
                    where: {
                        cat_cod: args.id,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        categoriasByName: async (
            _parent,
            { name },
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.categoria
                .findMany({
                    take: 10, //Limite de 10 produtos

                    where: {
                        cat_nome: { contains: name, mode: 'insensitive' },
                    },

                    select: {
                        cat_cod: true,
                        cat_nome: true,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },
    },

    Mutation: {
        createCategoria: async (
            _parent,
            args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.categoria
                .create({
                    data: {
                        cat_nome: args.data.nome,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        updateCategoria: async (
            _parent,
            args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.categoria
                .update({
                    where: {
                        cat_cod: args.id,
                    },

                    data: {
                        cat_nome: args.data.nome,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        deleteCategoria: async (
            _parent,
            args,
            { prismaClient }: PrismaContext,
        ) => {
            let del = true;

            await prismaClient.categoria
                .delete({
                    where: {
                        cat_cod: args.id,
                    },
                })
                .catch((err) => {
                    del = false;
                })
                .finally(async () => await prismaClient.$disconnect());

            return del;
        },
    },

    Categoria: {
        produtos: async (parent, _args, { prismaClient }: PrismaContext) => {
            return await prismaClient.produto.findMany({
                where: {
                    cat_cod_fk: parent.cat_cod,
                },
            });
        },
    },
};
