import { PrismaClient, Produto } from '@prisma/client';
import { storage } from 'config/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { PrismaContext } from '../../context';

export default {
    Query: {
        allProdutos: async (
            _parent,
            _args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.produto
                .findMany()
                .finally(async () => await prismaClient.$disconnect());
        },

        produtoById: async (
            _parent,
            { id },
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.produto
                .findFirst({
                    where: {
                        prod_cod: { equals: id },
                    },
                })
                .catch((err) => {
                    return new Error('O código informado não é válido!');
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        produtoByName: async (
            _parent,
            { name },
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.produto
                .findMany({
                    where: {
                        prod_nome: { contains: name, mode: 'insensitive' },
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        produtosByName: async (
            _parent,
            { name },
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.produto
                .findMany({
                    take: 10, //Limite de 10 produtos

                    where: {
                        prod_nome: { contains: name, mode: 'insensitive' },
                    },

                    select: {
                        prod_cod: true,
                        prod_nome: true,
                        prod_preco: true,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },
    },

    Mutation: {
        createProduto: async (
            _parent,
            {
                data: {
                    nome,
                    descricao,
                    preco,
                    estoque,
                    codbarra,
                    marca_cod_fk,
                    cat_cod_fk,
                },
            },
            { prismaClient }: PrismaContext,
        ) =>
            await prismaClient.produto.create({
                data: {
                    prod_nome: nome,
                    prod_descricao: descricao,
                    prod_preco: preco,
                    prod_estoque: estoque,
                    prod_codbarra: codbarra,
                    marca_cod_fk,
                    cat_cod_fk,
                },
            }),

        updateProduto: async (
            _parent,
            {
                id,
                data: {
                    nome,
                    descricao,
                    preco,
                    estoque,
                    codbarra,
                    marca_cod_fk,
                    cat_cod_fk,
                },
            },
            { prismaClient }: PrismaContext,
        ) => {
            const rawUpdateData = {
                prod_nome: nome,
                prod_descricao: descricao,
                prod_preco: preco,
                prod_estoque: estoque,
                prod_codbarra: codbarra,
                marca_cod_fk,
                cat_cod_fk,
            };

            const updateData = removeEmpty(rawUpdateData);

            const resposta = await prismaClient.produto.update({
                where: {
                    prod_cod: id,
                },

                data: updateData,
            });

            return !resposta
                ? new Error('Houve um problema ao tentar alterar o produto!')
                : resposta;
        },

        deleteProduto: async (
            _parent,
            { id },
            { prismaClient }: PrismaContext,
        ) => {
            let del = true;

            await prismaClient.produto
                .delete({
                    where: {
                        prod_cod: id,
                    },
                })
                .catch((err) => {
                    del = false;
                });

            return del;
        },
    },

    Produto: {
        item_pedido: async (parent, _args, { prismaClient }: PrismaContext) => {
            return await prismaClient.itemPedido.findMany({
                where: {
                    prod_cod_fk: parent.prod_cod,
                },
            });
        },

        marca: async (parent, _args, { prismaClient }: PrismaContext) => {
            return await prismaClient.marca.findUnique({
                where: {
                    marca_cod: parent.marca_cod_fk,
                },
            });
        },

        categoria: async (parent, _args, { prismaClient }: PrismaContext) => {
            return await prismaClient.categoria
                .findUnique({
                    where: {
                        cat_cod: parent.cat_cod_fk,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        produto_imagem: async (
            parent,
            _args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.produtoImagem.findMany({
                where: {
                    prod_cod_fk: parent.prod_cod,
                },
            });
        },

        produto_avaliacoes: async (
            parent,
            _args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.produtoAvaliacao.findMany({
                where: {
                    prod_cod_fk: parent.prod_cod,
                },
            });
        },

        produto_favoritado: async (
            parent,
            _args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.produtoFavoritado.findMany({
                where: {
                    prod_cod_fk: parent.prod_cod,
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
