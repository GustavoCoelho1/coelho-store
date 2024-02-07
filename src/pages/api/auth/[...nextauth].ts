import GQLClient from '../../../libs/apollo';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { iUsuario } from '../../../types/Usuario';
import { compare } from 'bcryptjs';
import { gql } from '@apollo/client';

const USUARIO_POR_EMAIL = gql`
    query ($email: String!) {
        usuarioByEmail(email: $email) {
            user_cod
            user_nome
            user_email
            user_senha
        }
    }
`;

const authOptions: NextAuthOptions = {
    callbacks: {
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.role = token.role as string;
                session.user.id = token.sub;
            }
            return session;
        },
        jwt: async ({ user, token }) => {
            if (user) {
                token.role = user.role;
                token.sub = user.id;
            }
            return token;
        },
    },

    session: {
        strategy: 'jwt',
    },

    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            authorize: async (credentials, req) => {
                const { email, senha } = credentials as {
                    email: string;
                    senha: string;
                };

                const { data: userData } = await GQLClient.query({
                    query: USUARIO_POR_EMAIL,
                    variables: {
                        email,
                    },
                });

                const usuario = userData.usuarioByEmail as iUsuario;

                console.log(usuario);

                if (usuario) {
                    if (usuario.user_email === process.env.ADMIN_USER) {
                        if (senha === process.env.ADMIN_PASSWORD) {
                            return {
                                id: usuario.user_cod,
                                name: usuario.user_nome,
                                email,
                                role: 'admin',
                            };
                        } else {
                            throw new Error(
                                'O usuário e/ou senha informados estão incorretos!',
                            );
                        }
                    } else {
                        if (await compare(senha, usuario.user_senha)) {
                            return {
                                id: usuario.user_cod,
                                name: usuario.user_nome,
                                email,
                                role: 'user',
                            };
                        } else {
                            throw new Error(
                                'O usuário e/ou senha informados estão incorretos!',
                            );
                        }
                    }
                } else {
                    throw new Error('O usuário informado não está registrado!');
                }
            },
        }),
    ],

    pages: {
        signIn: '/Login',
    },
};
export default NextAuth(authOptions);
