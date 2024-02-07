import { createModule } from 'graphql-modules';

import { typeDefs } from './ped-schema';
import resolvers from './ped-resolver';

export const pedidoModule = createModule({
    id: 'pedido',
    dirname: __dirname,
    typeDefs,
    resolvers,
});
