import { gql } from 'apollo-server-core';

export const typeDefs = gql`
    scalar Upload

    type Produto {
        prod_cod: ID!
        prod_nome: String!
        prod_descricao: String!
        prod_codbarra: String!
        prod_preco: Float!
        prod_estoque: Int!
        prod_dtcriacao: String!

        cat_cod_fk: String!
        marca_cod_fk: String!

        categoria: Categoria!
        marca: Marca!
        item_pedido: [ItemPedido]
        produto_avaliacoes: [ProdutoAvaliacao]
        produto_favoritado: [ProdutoFavoritado]
        produto_imagem: [ProdutoImagem]
    }

    type Query {
        allProdutos: [Produto]
        produtoById(id: ID!): Produto
        produtoByName(name: String!): [Produto]
        produtosByName(name: String!): [Produto]!
    }

    type Mutation {
        createProduto(data: iProduto!): Produto!
        updateProduto(id: ID!, data: iProdutoUpdate!): Produto!
        deleteProduto(id: ID!): Boolean
    }

    input iProduto {
        nome: String!
        descricao: String!
        codbarra: String!
        preco: Float!
        estoque: Int!
        dtcriacao: String

        cat_cod_fk: String!
        marca_cod_fk: String!
    }

    input iProdutoUpdate {
        nome: String
        descricao: String
        codbarra: String
        preco: Float
        estoque: Int

        cat_cod_fk: String
        marca_cod_fk: String
    }
`;
