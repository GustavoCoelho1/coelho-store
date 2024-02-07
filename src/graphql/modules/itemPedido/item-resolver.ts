import { convertToObject } from 'typescript';
import { PrismaContext } from '../../context';

export default {
    Query: {
        allItensPedido: async (
            _parent,
            _args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.itemPedido
                .findMany()
                .finally(async () => await prismaClient.$disconnect());
        },
    },

    Mutation: {
        createItemPedido: async (
            _parent,
            args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.itemPedido
                .create({
                    data: {
                        item_descricao: args.data.descricao,
                        item_quantidade: args.data.quantidade,
                        item_vlrtotal: args.data.vlrtotal,
                        item_vlrunitario: args.data.vlrunitario,
                        prod_cod_fk: args.data.prod_cod_fk,
                        ped_cod_fk: args.data.ped_cod_fk,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },
        updateItemPedido: async (
            _parent,
            args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.itemPedido
                .update({
                    where: {
                        item_cod: args.id,
                    },

                    data: {
                        item_descricao: args.data.descricao,
                        item_quantidade: args.data.quantidade,
                        item_vlrtotal: args.data.vlrtotal,
                        item_vlrunitario: args.data.vlrunitario,
                        prod_cod_fk: args.data.prod_cod_fk,
                        ped_cod_fk: args.data.ped_cod_fk,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        deleteItemPedido: async (
            _parent,
            args,
            { prismaClient }: PrismaContext,
        ) => {
            let del = true;

            await prismaClient.itemPedido
                .delete({
                    where: {
                        item_cod: args.id,
                    },
                })
                .catch((err) => {
                    del = false;
                })
                .finally(async () => await prismaClient.$disconnect());

            return del;
        },
    },

    ItemPedido: {
        produto: async (parent, _args, { prismaClient }: PrismaContext) => {
            return await prismaClient.produto.findUnique({
                where: {
                    prod_cod: parent.prod_cod_fk,
                },
            });
        },

        pedido: async (parent, _args, { prismaClient }: PrismaContext) => {
            return await prismaClient.pedido.findUnique({
                where: {
                    ped_cod: parent.ped_cod_fk,
                },
            });
        },
    },
};
