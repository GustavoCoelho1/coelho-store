import { createModule } from 'graphql-modules';

import { typeDefs } from './item-schema';
import resolvers from './item-resolver';

export const itemPedidoModule = createModule({
    id: 'itemPedido',
    dirname: __dirname,
    typeDefs,
    resolvers,
});
