import { createModule } from 'graphql-modules';

import { typeDefs } from './mrc-schema';
import resolvers from './mrc-resolver';

export const marcaModule = createModule({
    id: 'marca',
    dirname: __dirname,
    typeDefs,
    resolvers,
});
