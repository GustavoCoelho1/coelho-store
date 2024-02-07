import { gql } from 'graphql-modules';

export const typeDefs = gql`
    type Cliente {
        cli_cod: ID!
        cli_nome: String
        cli_idade: Int
        cli_celular: String

        user_cod_fk: String!

        usuario: Usuario!
        pedidos: [Pedido!]!
        cliente_endereco: [ClienteEndereco!]!
    }

    type Query {
        allClientes: [Cliente]
        clienteById(id: ID!): Cliente
        clienteByUserId(id: ID!): Cliente
        clientesByName(name: String!): [Cliente]
    }

    type Mutation {
        createCliente(data: iCliente!): Cliente!
        updateCliente(id: ID!, data: iCliente!): Cliente!
        deleteCliente(id: ID!): Boolean
    }

    input iCliente {
        nome: String!
        idade: Int!
        celular: String!

        user_cod_fk: String!
    }
`;
