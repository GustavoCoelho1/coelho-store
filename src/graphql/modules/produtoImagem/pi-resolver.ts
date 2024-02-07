import { PrismaContext } from '../../context';

export default {
    Query: {
        allProdutosImagens: async (
            _parent,
            _args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.produtoImagem
                .findMany()
                .finally(async () => await prismaClient.$disconnect());
        },

        produtoImagemById: async (
            _parent,
            { id },
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.produtoImagem
                .findUnique({
                    where: {
                        img_cod: id,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        produtoImagemByLink: async (
            _parent,
            { link },
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.produtoImagem
                .findFirst({
                    where: {
                        img_link: link,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },
    },

    Mutation: {
        createProdutoImagem: async (
            _parent,
            { data: { position, link, ordem, prod_cod_fk } },
            { prismaClient }: PrismaContext,
        ) => {
            console.log(link);

            const imgExiste = await prismaClient.produtoImagem.findFirst({
                where: {
                    img_link: link,
                },
            });

            if (imgExiste) {
                return imgExiste;
            } else {
                let ordemAutomatica = 0;

                if (ordem) {
                    const ordemUsada =
                        await prismaClient.produtoImagem.findFirst({
                            where: {
                                img_ordem: ordem,
                                prod_cod_fk,
                            },
                        });

                    if (ordemUsada) {
                        return new Error(
                            'A ordem de exposição da imagem já está em uso!',
                        );
                    }
                } else {
                    const {
                        _max: { img_ordem: ultimaOrdem },
                    } = await prismaClient.produtoImagem.aggregate({
                        where: {
                            prod_cod_fk,
                        },

                        _max: {
                            img_ordem: true,
                        },
                    });

                    ordemAutomatica = ultimaOrdem + 1;
                }

                return await prismaClient.produtoImagem
                    .create({
                        data: {
                            img_position: position ? position : undefined,
                            img_link: link,
                            img_ordem: ordem ? ordem : ordemAutomatica,
                            prod_cod_fk,
                        },
                    })
                    .finally(async () => await prismaClient.$disconnect());
            }
        },

        updateProdutoImagem: async (
            _parent,
            { id, data: { position, link, ordem, prod_cod_fk } },
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.produtoImagem
                .update({
                    where: {
                        img_cod: id,
                    },

                    data: {
                        img_position: position ? position : undefined,
                        img_link: link,
                        img_ordem: ordem,
                        prod_cod_fk,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        deleteProdutoImagem: async (
            _parent,
            { id },
            { prismaClient }: PrismaContext,
        ) => {
            let del = true;

            await prismaClient.produtoImagem
                .delete({
                    where: {
                        img_cod: id,
                    },
                })
                .catch((err) => {
                    del = false;
                })
                .finally(async () => await prismaClient.$disconnect());

            return del;
        },
    },

    ProdutoImagem: {
        produto: async (parent, _args, { prismaClient }: PrismaContext) => {
            return await prismaClient.produto.findUnique({
                where: {
                    prod_cod: parent.prod_cod_fk,
                },
            });
        },
    },
};
