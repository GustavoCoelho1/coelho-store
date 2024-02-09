import { gql } from 'graphql-modules';

export const typeDefs = gql`
    type Categoria {
        cat_cod: ID!
        cat_nome: String!

        produtos: [Produto!]!
    }

    type Query {
        allCategorias: [Categoria]
        categoriaById(id: ID!): Categoria!
        categoriasByName(name: String!): [Categoria!]
    }

    type Mutation {
        createCategoria(data: iCategoria!): Categoria!
        updateCategoria(id: ID!, data: iCategoria!): Categoria!
        deleteCategoria(id: ID!): Boolean
    }

    input iCategoria {
        nome: String!
    }
`;
