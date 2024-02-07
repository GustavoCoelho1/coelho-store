import { gql } from 'graphql-modules';

export const typeDefs = gql`
    type ClienteEndereco {
        cliend_cod: ID!

        cli_cod_fk: String!
        end_cod_fk: String!

        cliente: Cliente!
        endereco: Endereco!
    }

    type Query {
        allClientesEnderecos: [ClienteEndereco]
    }

    type Mutation {
        createClienteEndereco(data: iClienteEndereco!): ClienteEndereco!
        updateClienteEndereco(
            id: ID!
            data: iClienteEndereco!
        ): ClienteEndereco!
        deleteClienteEndereco(id: ID!): Boolean
    }

    input iClienteEndereco {
        cli_cod_fk: String!
        end_cod_fk: String!
    }
`;
