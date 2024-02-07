import { gql } from 'graphql-modules';

export const typeDefs = gql`
    type Marca {
        marca_cod: ID!
        marca_nome: String!

        produtos: [Produto!]!
    }

    type Query {
        allMarcas: [Marca]
        marcaById(id: ID!): Marca!
        marcasByName(name: String!): [Marca!]
    }

    type Mutation {
        createMarca(data: iMarca!): Marca!
        updateMarca(id: ID!, data: iMarca!): Marca!
        deleteMarca(id: ID!): Boolean
    }

    input iMarca {
        nome: String!
    }
`;
