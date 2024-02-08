import { Pedido, PrismaClient } from '@prisma/client';
import { iProdutoCarrinho } from 'app/carrinho.store';
import stripeClient from 'libs/stripe';
import Stripe from 'stripe';
import { PrismaContext } from '../../context';

export default {
    Query: {
        allPedidos: async (_parent, _args, { prismaClient }: PrismaContext) => {
            return await prismaClient.pedido
                .findMany()
                .finally(async () => await prismaClient.$disconnect());
        },

        pedidoById: async (
            _parent,
            { id },
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.pedido
                .findUnique({
                    where: {
                        ped_cod: id,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        pedidosByClientId: async (
            _parent,
            { id },
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.pedido
                .findMany({
                    where: {
                        cli_cod_fk: id,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },
    },

    Mutation: {
        createPedido: async (
            _parent,
            args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.pedido
                .create({
                    data: {
                        ped_valortotal: args.data.valortotal,
                        cli_cod_fk: args.data.cli_cod_fk,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        createPedidoCompleto: async (
            _parent,
            { data: { pedido, item_pedido } },
            { prismaClient }: PrismaContext,
        ) => {
            const resposta = await prismaClient
                .$transaction(async (tx: PrismaClient) => {
                    const createPedido = await tx.pedido.create({
                        data: {
                            ped_valortotal: pedido.valortotal,
                            cli_cod_fk: pedido.cli_cod_fk,
                        },
                    });

                    for (let x = 0; x < item_pedido.length; x++) {
                        const item = item_pedido[x];

                        const createItemPedido = await tx.itemPedido.create({
                            data: {
                                item_quantidade: item.quantidade,
                                item_descricao: item.descricao,
                                item_vlrunitario: item.vlrunitario,
                                item_vlrtotal: item.vlrtotal,
                                prod_cod_fk: item.prod_cod_fk,
                                ped_cod_fk: createPedido.ped_cod,
                            },
                        });
                    }

                    return createPedido;
                })
                .catch((err) => {
                    throw new Error('Houve um erro ao cadastrar o pedido!');
                })
                .finally(async () => await prismaClient.$disconnect());

            return resposta;
        },

        updatePedido: async (
            _parent,
            { id, data: { data, valortotal, status } },
            { prismaClient }: PrismaContext,
        ) => {
            const rawUpdateData = {
                ped_valortotal: valortotal,
                ped_status: status,
                ped_data: data,
            };

            const updateData = removeEmpty(rawUpdateData);

            const resposta = await prismaClient.pedido.update({
                where: {
                    ped_cod: id,
                },

                data: updateData,
            });

            return !resposta
                ? new Error('Houve um problema ao tentar alterar o produto!')
                : resposta;
        },

        deletePedido: async (
            _parent,
            args,
            { prismaClient }: PrismaContext,
        ) => {
            let deletePed = true;

            await prismaClient.pedido
                .delete({
                    where: {
                        ped_cod: args.id,
                    },
                })
                .catch((err) => {
                    deletePed = false;
                })
                .finally(async () => await prismaClient.$disconnect());

            return deletePed;
        },

        createStripeCheckout: async (
            _parent,
            {
                data: { produtos, endereco, total, userId },
            }: {
                data: {
                    userId: string;
                    produtos: iProdutoCarrinho[];
                    endereco: { id: string; name: string };
                    total: number;
                };
            },
            { prismaClient }: PrismaContext,
        ) => {
            const produtosSerialized = produtos.map((item) => {
                const prodImg = item.produto_imagem.find(
                    (img) => img.img_ordem === 1,
                );

                return {
                    quantity: item.prod_qtdCarrinho,
                    price_data: {
                        currency: 'BRL',
                        product_data: {
                            name: item.prod_nome,
                            images: [prodImg.img_link],
                            description: item.prod_descricao,
                        },
                        unit_amount: Number(item.prod_preco) * 100,
                    },
                } as Stripe.Checkout.SessionCreateParams.LineItem;
            });

            const { user, pedido, itensPedido } =
                await prismaClient.$transaction(async (tx: PrismaClient) => {
                    const user = await tx.usuario.findFirst({
                        where: {
                            user_cod: userId,
                        },
                        select: {
                            user_email: true,
                            cliente: true,
                        },
                    });

                    const pedido = await tx.pedido.create({
                        data: {
                            ped_valortotal: total,
                            cli_cod_fk: user.cliente.cli_cod,
                        },
                    });

                    let itensPedido = [];

                    for (let prod in produtos) {
                        const thisProd = produtos[prod];

                        const itemPedido = await tx.itemPedido.create({
                            data: {
                                item_descricao: thisProd.prod_nome,
                                item_quantidade: thisProd.prod_qtdCarrinho,
                                item_vlrtotal:
                                    thisProd.prod_qtdCarrinho *
                                    Number(thisProd.prod_preco),
                                item_vlrunitario: Number(thisProd.prod_preco),
                                ped_cod_fk: pedido.ped_cod,
                                prod_cod_fk: thisProd.prod_cod,
                            },
                        });

                        itensPedido.push(itemPedido);
                    }

                    return {
                        user,
                        pedido,
                        itensPedido:
                            itensPedido.length > 0 ? itensPedido : null,
                    };
                });

            if (user && pedido && itensPedido) {
                const session = await stripeClient.checkout.sessions.create({
                    line_items: produtosSerialized,
                    mode: 'payment',
                    success_url: `${process.env.HOST_URL}Obrigado?success=true`,
                    cancel_url: `${process.env.HOST_URL}`,
                    metadata: { orderId: pedido.ped_cod },
                    customer_email: user.user_email,
                });

                return session.url;
            } else {
                throw new Error('Houve um erro ao criar o pedido!');
            }
        },
    },

    Pedido: {
        cliente: async (parent, _args, { prismaClient }: PrismaContext) => {
            return await prismaClient.cliente
                .findUnique({
                    where: {
                        cli_cod: parent.cli_cod_fk,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        item_pedido: async (parent, _args, { prismaClient }: PrismaContext) => {
            return await prismaClient.itemPedido
                .findMany({
                    where: {
                        ped_cod_fk: parent.ped_cod,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },
    },
};

function removeEmpty(obj) {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v != null),
    );
}
