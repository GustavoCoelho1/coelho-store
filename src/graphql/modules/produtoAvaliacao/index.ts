import { createModule } from 'graphql-modules';

import { typeDefs } from './pa-schema';
import resolvers from './pa-resolver';

export const produtoAvaliacaoModule = createModule({
    id: 'produtoAvaliacao',
    dirname: __dirname,
    typeDefs,
    resolvers,
});
