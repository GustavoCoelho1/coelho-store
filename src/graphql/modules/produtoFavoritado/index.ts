import { createModule } from 'graphql-modules';

import { typeDefs } from './pf-schema';
import resolvers from './pf-resolver';

export const produtoFavoritadoModule = createModule({
    id: 'produtoFavoritado',
    dirname: __dirname,
    typeDefs,
    resolvers,
});
