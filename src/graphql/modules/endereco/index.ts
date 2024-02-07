import { createModule } from 'graphql-modules';

import { typeDefs } from './end-schema';
import resolvers from './end-resolver';

export const enderecoModule = createModule({
    id: 'endereco',
    dirname: __dirname,
    typeDefs,
    resolvers,
});
