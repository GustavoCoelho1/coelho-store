import { createModule } from 'graphql-modules';

import { typeDefs } from './cli-schema';
import resolvers from './cli-resolver';

export const clienteModule = createModule({
    id: 'cliente',
    dirname: __dirname,
    typeDefs,
    resolvers,
});
