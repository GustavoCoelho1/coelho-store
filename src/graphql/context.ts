import { PrismaClient } from '.prisma/client';
import prismaClient from '../libs/prisma';

export type PrismaContext = {
    prismaClient: PrismaClient;
};

export const context: PrismaContext = {
    prismaClient: prismaClient,
};
