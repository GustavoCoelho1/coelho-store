import { createModule } from 'graphql-modules';

import { typeDefs } from './user-schema';
import resolvers from './user-resolver';

export const usuarioModule = createModule({
    id: 'usuario',
    dirname: __dirname,
    typeDefs,
    resolvers,
});
