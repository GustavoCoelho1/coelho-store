import { gql } from 'graphql-modules';

export const typeDefs = gql`
    type Usuario {
        user_cod: ID!
        user_nome: String!
        user_email: String!
        user_senha: String!

        cliente: Cliente!
    }

    type UsuarioComplete {
        usuario: Usuario
        cliente: Cliente
        endereco: Endereco
    }

    type Query {
        allUsuarios: [Usuario]!
        usuarioById(id: ID!): Usuario
        usuarioByEmail(email: String!): Usuario
    }

    type Mutation {
        createUsuario(data: iUsuario!): Usuario
        updateUsuario(id: ID!, data: iUsuario!): Usuario
        deleteUsuario(id: ID!): Boolean
        authenticateUsuario(data: iUsuarioLogin): Usuario
        createUsuarioComplete(data: iUsuarioComplete): UsuarioComplete
    }

    input iUsuario { #Isso qui é tipo um interface do Typescript, nesse caso um de usuário
        nome: String!
        email: String!
        senha: String!
    }

    input iUsuarioLogin {
        email: String!
        senha: String!
    }

    input iClienteForUsuarioComplete {
        nome: String!
        idade: Int!
        celular: String!
    }

    input iUsuarioComplete {
        usuario: iUsuario
        cliente: iClienteForUsuarioComplete
        endereco: iEndereco
    }
`;
