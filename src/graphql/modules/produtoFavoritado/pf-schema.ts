import { gql } from 'apollo-server-core';

export const typeDefs = gql`
    type ProdutoFavoritado {
        fav_cod: ID!
        fav_active: Boolean!

        user_cod_fk: String!
        prod_cod_fk: String!

        usuario: Usuario!
        produto: Produto!
    }

    type Query {
        allProdutosFavoritados: [ProdutoFavoritado]
        usuarioFavoritouProduto(data: iProdutoFavoritado!): Boolean
        usuarioAllProdutosFavoritados(user_cod: ID!): [ProdutoFavoritado]
        produtoAllFavoritos(prod_cod: ID!): [ProdutoFavoritado]
    }

    type Mutation {
        createProdutoFavoritado(data: iProdutoFavoritado!): ProdutoFavoritado!
        updateProdutoFavoritado(
            id: ID!
            data: iProdutoFavoritado!
        ): ProdutoFavoritado!
        deleteProdutoFavoritado(id: ID!): Boolean
        unactivateProdutoFavoritado(data: iProdutoFavoritado!): Boolean
    }

    input iProdutoFavoritado {
        prod_cod_fk: String!
        user_cod_fk: String!
    }
`;
