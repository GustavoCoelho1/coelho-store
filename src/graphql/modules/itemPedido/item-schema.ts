import { gql } from 'graphql-modules';

export const typeDefs = gql`
    type ItemPedido {
        item_cod: ID!
        item_quantidade: Int!
        item_descricao: String!
        item_vlrunitario: Float!
        item_vlrtotal: Float!

        prod_cod_fk: String!
        ped_cod_fk: String!

        produto: Produto!
        pedido: Pedido!
    }

    type Query {
        allItensPedido: [ItemPedido]
    }

    type Mutation {
        createItemPedido(data: iItemPedido!): ItemPedido!
        updateItemPedido(id: ID!, data: iItemPedido!): ItemPedido!
        deleteItemPedido(id: ID!): Boolean
    }

    input iItemPedido {
        quantidade: Int!
        descricao: String!
        vlrunitario: Float!
        vlrtotal: Float!

        prod_cod_fk: String!
        ped_cod_fk: String!
    }
`;
