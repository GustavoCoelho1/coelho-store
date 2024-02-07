import { gql } from 'apollo-server-core';

export const typeDefs = gql`
    type ProdutoAvaliacao {
        avaliacao_cod: ID!
        avaliacao_estrelas: Int!
        avaliacao_comentario: String!
        avaliacao_data: String!

        user_cod_fk: String!
        prod_cod_fk: String!

        usuario: Usuario!
        produto: Produto!
    }

    type Query {
        allProdutosAvaliacoes: [ProdutoAvaliacao]
        produtoAvaliacoesByProdutoId(id: ID!): [ProdutoAvaliacao]
    }

    type Mutation {
        createProdutoAvaliacao(data: iProdutoAvaliacao!): ProdutoAvaliacao!
        updateProdutoAvaliacao(
            id: ID!
            data: iProdutoAvaliacao!
        ): ProdutoAvaliacao!
        deleteProdutoAvaliacao(id: ID!): Boolean
    }

    input iProdutoAvaliacao {
        estrelas: Int!
        comentario: String!
        prod_cod_fk: String!
        user_cod_fk: String!
    }
`;
