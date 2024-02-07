import { createModule } from 'graphql-modules';

import { typeDefs } from './pi-schema';
import resolvers from './pi-resolver';

export const produtoImagemModule = createModule({
    id: 'produtoImagem',
    dirname: __dirname,
    typeDefs,
    resolvers,
});
