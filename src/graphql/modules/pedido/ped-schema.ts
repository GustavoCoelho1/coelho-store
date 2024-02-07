import { gql } from 'graphql-modules';

export const typeDefs = gql`
    type Pedido {
        ped_cod: ID!
        ped_status: String!
        ped_data: String!
        ped_valortotal: Float!
        cli_cod_fk: String!

        cliente: Cliente!
        item_pedido: [ItemPedido!]!
    }
    type Query {
        allPedidos: [Pedido]
        pedidoById(id: ID!): Pedido
        pedidosByClientId(id: ID!): [Pedido!]
    }

    type Mutation {
        createPedido(data: iPedido!): Pedido!
        createPedidoCompleto(data: iPedidoCompleto): Pedido!
        updatePedido(id: ID!, data: iPedidoUpdate!): Pedido!
        deletePedido(id: ID!): Boolean
        createStripeCheckout(data: iCheckout): String
    }

    input iPedido {
        data: String!
        status: String
        valortotal: Float!
        cli_cod_fk: String!
    }

    input iPedidoUpdate {
        data: String
        status: String
        valortotal: Float
    }

    input iPedidoCompleto {
        pedido: iPedido!
        item_pedido: [iItemPedidoForPedidoCompleto]!
    }

    input iItemPedidoForPedidoCompleto {
        quantidade: Int!
        descricao: String!
        vlrunitario: Float!
        vlrtotal: Float!

        prod_cod_fk: String!
    }

    input iCheckout {
        userId: ID!
        produtos: [iProdutoCarrinho!]!
        endereco: iEnderecoCarrinho!
        total: Float!
    }

    input iEnderecoCarrinho {
        id: String!
        name: String!
    }

    input iProdutoCarrinho {
        prod_cod: ID!
        prod_nome: String!
        prod_descricao: String!
        prod_preco: Float!
        prod_qtdCarrinho: Int!
        produto_imagem: [iProdutoImagemCarrinho]!
    }

    input iProdutoImagemCarrinho {
        img_cod: ID!
        img_ordem: Int!
        img_link: String!
    }
`;
