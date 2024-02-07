import { createModule } from 'graphql-modules';

import { typeDefs } from './cat-schema';
import resolvers from './cat-resolver';

export const categoriaModule = createModule({
    id: 'categoria',
    dirname: __dirname,
    typeDefs,
    resolvers,
});
