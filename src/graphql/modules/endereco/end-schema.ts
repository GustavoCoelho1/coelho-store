import { gql } from 'graphql-modules';

export const typeDefs = gql`
    type Endereco {
        end_cod: ID!
        end_cep: String!
        end_bairro: String!
        end_rua: String!
        end_ruanum: Int!
        end_cidade: String!
        end_estado: String!

        cliente_endereco: [ClienteEndereco!]!
    }

    type Query {
        allEnderecos: [Endereco]
        enderecoById(id: ID!): Endereco!
    }

    type Mutation {
        createEndereco(data: iEndereco!): Endereco!
        updateEndereco(id: ID!, data: iEndereco!): Endereco!
        deleteEndereco(id: ID!): Boolean
    }

    input iEndereco {
        cep: String!
        bairro: String!
        rua: String!
        ruanum: Int!
        cidade: String!
        estado: String!
    }
`;
