import { compare, hash } from 'bcryptjs';
import { PrismaContext } from '../../context';
import { iCadastroDataProps } from '../../../types/CadastroData';
import { PrismaClient } from '@prisma/client';

export default {
    Query: {
        allUsuarios: async (
            _parent,
            _args,
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.usuario
                .findMany()
                .finally(async () => await prismaClient.$disconnect());
        },

        usuarioById: async (
            _parent,
            { id },
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.usuario
                .findUnique({
                    where: {
                        user_cod: id,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },

        usuarioByEmail: async (
            _parent,
            { email },
            { prismaClient }: PrismaContext,
        ) => {
            return await prismaClient.usuario
                .findUnique({
                    where: {
                        user_email: email,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());
        },
    },

    Mutation: {
        createUsuario: async (
            _parent,
            { data },
            { prismaClient }: PrismaContext,
        ) => {
            // #region Validações
            const usuarioExiste = await prismaClient.usuario.findFirst({
                where: {
                    user_nome: data.usuario.nome,
                },
            });

            const emailExiste = await prismaClient.usuario.findFirst({
                where: {
                    user_email: data.usuario.email,
                },
            });

            if (usuarioExiste) {
                return new Error('O usuário informado já existe!');
            }

            if (emailExiste) {
                return new Error('O e-mail informado já existe!');
            }
            //#endregion

            const senhaCripto = await hash(data.senha, 8);

            const resposta = await prismaClient.usuario
                .create({
                    data: {
                        user_nome: data.nome,
                        user_email: data.email,
                        user_senha: senhaCripto,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());

            return !resposta
                ? new Error('Houve um erro ao tentar executar a ação!')
                : resposta;
        },

        updateUsuario: async (
            _parent,
            { id, data },
            { prismaClient }: PrismaContext,
        ) => {
            //#region Validações
            const usuarioExiste = await prismaClient.usuario.findFirst({
                where: {
                    user_email: data.email,
                },
            });

            if (!usuarioExiste) {
                return new Error('O usuário informado não existe!');
            }
            //#endregion

            const resposta = await prismaClient.usuario
                .update({
                    where: {
                        user_cod: id,
                    },

                    data: {
                        user_nome: data.nome,
                        user_email: data.email,
                        user_senha: data.senha,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());

            return !resposta
                ? new Error('Houve um erro ao tentar executar a ação!')
                : resposta;
        },

        deleteUsuario: async (
            _parent,
            { id },
            { prismaClient }: PrismaContext,
        ) => {
            //#region Validações
            const usuarioExiste = await prismaClient.usuario.findFirst({
                where: {
                    user_cod: id,
                },
            });

            if (!usuarioExiste) {
                return new Error('O usuário informado não existe!');
            }
            //#endregion

            const resposta = await prismaClient.usuario
                .delete({
                    where: {
                        user_cod: id,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());

            return !resposta
                ? new Error('Houve um erro ao tentar executar a ação!')
                : true;
        },

        authenticateUsuario: async (
            _parent,
            { data },
            { prismaClient }: PrismaContext,
        ) => {
            const usuarioValido = await prismaClient.usuario
                .findFirst({
                    where: {
                        user_email: data.email,
                    },
                })
                .finally(async () => await prismaClient.$disconnect());

            if (!usuarioValido) {
                return new Error(
                    'O usuário ou senha informados estão incorretos!',
                );
            }

            const senhaCorreta = await compare(
                data.senha,
                usuarioValido.user_senha,
            );

            if (!senhaCorreta) {
                return new Error(
                    'O usuário ou senha informados estão incorretos!',
                );
            } else {
                return usuarioValido;
            }
        },

        createUsuarioComplete: async (
            _parent,
            {
                data: { usuario, endereco, cliente },
            }: { data: iCadastroDataProps },
            { prismaClient }: PrismaContext,
        ) => {
            // #region Validações
            const usuarioExiste = await prismaClient.usuario.findFirst({
                where: {
                    user_nome: usuario.nome,
                },
            });

            const emailExiste = await prismaClient.usuario.findFirst({
                where: {
                    user_email: usuario.email,
                },
            });

            const celularExiste = await prismaClient.cliente.findFirst({
                where: {
                    cli_celular: cliente.celular,
                },
            });

            if (usuarioExiste) {
                return new Error('O usuário informado já existe!');
            }

            if (emailExiste) {
                return new Error('O e-mail informado já existe!');
            }

            if (celularExiste) {
                return new Error('O celular informado já foi cadastrado!');
            }
            //#endregion

            const senhaCripto = await hash(usuario.senha, 8);

            const resposta = await prismaClient
                .$transaction(async (tx: PrismaClient) => {
                    const createUsuario = await tx.usuario.create({
                        data: {
                            user_nome: usuario.nome,
                            user_email: usuario.email,
                            user_senha: senhaCripto,
                        },
                    });

                    const createCliente = await tx.cliente.create({
                        data: {
                            cli_nome: cliente.nome,
                            cli_idade: cliente.idade,
                            cli_celular: cliente.celular,
                            user_cod_fk: createUsuario.user_cod,
                        },
                    });

                    const createEndereco = await tx.endereco.create({
                        data: {
                            end_rua: endereco.rua,
                            end_bairro: endereco.bairro,
                            end_cep: endereco.cep,
                            end_cidade: endereco.cidade,
                            end_estado: endereco.estado,
                            end_ruanum: endereco.ruanum,
                        },
                    });

                    const createClienteEndereco =
                        await tx.clienteEndereco.create({
                            data: {
                                cli_cod_fk: createCliente.cli_cod,
                                end_cod_fk: createEndereco.end_cod,
                            },
                        });

                    return {
                        usuario: createUsuario,
                        cliente: createCliente,
                        endereco: createEndereco,
                    };
                })
                .catch((err) => false)
                .finally(async () => await prismaClient.$disconnect());

            return !resposta
                ? new Error('Houve um problema ao tentar cadastrar o usuário!')
                : resposta;
        },
    },

    Usuario: {
        cliente: async (parent, _args, { prismaClient }: PrismaContext) => {
            return await prismaClient.cliente.findFirst({
                where: {
                    user_cod_fk: parent.user_cod,
                },
            });
        },
    },
};
