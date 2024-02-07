import { createModule } from 'graphql-modules';

import { typeDefs } from './prod-schema';
import resolvers from './prod-resolver';

export const produtoModule = createModule({
    id: 'produto',
    dirname: __dirname,
    typeDefs,
    resolvers,
});
