import { createModule } from 'graphql-modules';

import { typeDefs } from './cliend-schema';
import resolvers from './cliend-resolver';

export const clienteEnderecoModule = createModule({
    id: 'clienteEndereco',
    dirname: __dirname,
    typeDefs,
    resolvers,
});
