import { gql } from 'apollo-server-core';

export const typeDefs = gql`
    type ProdutoImagem {
        img_cod: ID!
        img_link: String!
        img_ordem: Int!
        img_position: String!

        prod_cod_fk: String!

        produto: Produto!
    }

    type Query {
        allProdutosImagens: [ProdutoImagem]
        produtoImagemById(id: ID!): ProdutoImagem
        produtoImagemByLink(link: String!): ProdutoImagem
    }

    type Mutation {
        createProdutoImagem(data: iProdutoImagem!): ProdutoImagem!
        updateProdutoImagem(id: ID!, data: iProdutoImagem!): ProdutoImagem!
        deleteProdutoImagem(id: ID!): Boolean
    }

    input iProdutoImagem {
        position: String
        link: String!
        ordem: Int
        prod_cod_fk: String!
    }
`;
