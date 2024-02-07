import { PrismaClient } from '@prisma/client';

/**
 * Esse arquivo vai servir para gerar uma instância global do PrismaClient, e isso para podermos trabalhar de maneira fluída com o modo de desenvolvimento do Next, pois a cada modificação que ocorre no código uma recompilação acontece, e com isso, trabalhando com intâncias individuais do PrismaClient em cada arquivo geraria uma conexão a cada Refresh que ocorresse no código, o que acarreta lentidão e problemas na execução do App
 */

declare global {
    var prismaClient: PrismaClient | undefined;
}

const prismaClient = global.prismaClient || new PrismaClient();

global.prismaClient = prismaClient;

export default prismaClient;
