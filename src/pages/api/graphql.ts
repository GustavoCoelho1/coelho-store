import { ApolloServer } from 'apollo-server-micro';
import {
    ApolloServerPluginLandingPageDisabled,
    ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import Cors from 'micro-cors';

import { NextApiHandler } from 'next';
import { RequestHandler } from 'micro';

import { usuarioModule } from '../../graphql/modules/usuario';
import { clienteModule } from '../../graphql/modules/cliente';
import { produtoModule } from '../../graphql/modules/produto';
import { enderecoModule } from '../../graphql/modules/endereco';
import { pedidoModule } from '../../graphql/modules/pedido';
import { marcaModule } from '../../graphql/modules/marca';
import { itemPedidoModule } from '../../graphql/modules/itemPedido';
import { clienteEnderecoModule } from '../../graphql/modules/clienteEndereco';
import { categoriaModule } from '../../graphql/modules/categoria';
import { produtoImagemModule } from '../../graphql/modules/produtoImagem';
import { produtoAvaliacaoModule } from '../../graphql/modules/produtoAvaliacao';
import { produtoFavoritadoModule } from '../../graphql/modules/produtoFavoritado';

import { context } from '../../graphql/context';
import { createApplication } from 'graphql-modules';

const cors = Cors();

export const config = {
    api: {
        bodyParser: false, //Aqui "desativamos" o interpretador do Next, porque toda requisição que chegar aqui será de importância só para o GraphQL
    },
};

const application = createApplication({
    modules: [
        usuarioModule,
        clienteModule,
        produtoModule,
        categoriaModule,
        enderecoModule,
        pedidoModule,
        marcaModule,
        itemPedidoModule,
        clienteEnderecoModule,
        produtoAvaliacaoModule,
        produtoFavoritadoModule,
        produtoImagemModule,
    ],
});

const executor = application.createApolloExecutor();
const schema = application.schema;

const apolloServer = new ApolloServer({
    schema,
    executor,
    context,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
        process.env.NODE_ENV === 'production'
            ? ApolloServerPluginLandingPageDisabled()
            : ApolloServerPluginLandingPageLocalDefault(),
    ],
});

const startServer = apolloServer.start();

const handler: NextApiHandler = async (request, response) => {
    if (request.method === 'OPTIONS') {
        //Se o método de requisição usado for um OPTIONS ele será encerrado, pois esse é método que o graphql precisará usar
        response.end();
        return false;
    }

    await startServer;

    const apolloHandler = await apolloServer.createHandler({
        path: '/api/graphql', //Podemos setar uma rota para o nosso Request Handler do Apollo, nesse caso estamos usamos esse mesmo arquivo como Handler, então aí vamos apenas passar as informações de `request` e `response` para o ApolloServer
    });

    return apolloHandler(request, response);
};

export default cors(handler as RequestHandler);
