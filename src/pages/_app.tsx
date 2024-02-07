import '../styles/globals.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { Provider } from 'react-redux';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider, useSession } from 'next-auth/react';

import MainLayout from 'components/layouts/MainLayout';
import { store, persistor } from '../app';
import { Session } from 'next-auth';
import AdminLayout from '../components/layouts/AdminLayout';
import { ApolloProvider } from '@apollo/client';
import apolloClient from 'libs/apollo';

type PageAuthProps = {
    role: string;
    loading: string;
    unauthorized: string;
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type CustomAppProps = AppProps<{ session: Session }> & {
    Component: NextPageWithLayout & { auth: PageAuthProps };
};

function MyApp({ Component, pageProps, router }: CustomAppProps) {
    const getLayout =
        Component.auth && Component.auth.role === 'admin'
            ? (page) => <AdminLayout>{page}</AdminLayout>
            : Component.getLayout ??
              ((page) => <MainLayout>{page}</MainLayout>);

    return (
        <ApolloProvider client={apolloClient}>
            <SessionProvider session={pageProps.session}>
                {/*Redux*/}
                <Provider store={store}>
                    {/*Redux Persist*/}
                    <PersistGate loading={null} persistor={persistor}>
                        <AnimatePresence mode="wait" initial={false}>
                            {Component.auth ? (
                                <Auth auth={Component.auth}>
                                    {getLayout(
                                        <Component
                                            {...pageProps}
                                            key={router.route}
                                        />,
                                    )}
                                </Auth>
                            ) : (
                                getLayout(
                                    <Component
                                        {...pageProps}
                                        key={router.route}
                                    />,
                                )
                            )}
                        </AnimatePresence>
                    </PersistGate>
                </Provider>
            </SessionProvider>
        </ApolloProvider>
    );
}

function Auth({ children, auth }) {
    const { data, status } = useSession({ required: true });

    if (status === 'loading') {
        return auth.loading;
    }

    if (status === 'authenticated') {
        if (auth.role === 'admin') {
            if (data.user.role === auth.role) {
                return children;
            } else {
                Router.push('/');

                return null;
            }
        }
    }

    return children;
}

export default MyApp;
