import Head from 'next/head';
import { motion } from 'framer-motion';
import { ReactElement, useContext } from 'react';
import { ToastContainer, ToastContainerProps } from 'react-toastify';

import type { NextPageWithLayout } from './_app';
import animate from 'animations';
import styles from 'styles/Cadastro.module.scss';
import { myFadeIn, myFadeInUp } from 'animations/myAnimations';
import FormUsuario from 'components/cadastro/FormUsuario';
import FormCliente from 'components/cadastro/FormCliente';
import { CadastroProvider } from 'contexts/CadastroContext';

const toastContainerSettings = {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: 'light',
} as ToastContainerProps;

const Cadastro: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Coelhão Store</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <motion.main
                className={styles.mainBlock}
                exit={{ opacity: 0 }}
                initial="initial"
                animate="animate"
                variants={animate.stagger(0.5)}
            >
                <motion.div variants={myFadeIn} className={styles.messageBlock}>
                    <motion.div
                        variants={animate.stagger(0.1)}
                        className={styles.messageInner}
                    >
                        <motion.h1
                            variants={myFadeInUp}
                            className={styles.titulo}
                        >
                            Coelho Store
                        </motion.h1>

                        <motion.span
                            variants={myFadeInUp}
                            className={styles.subtitulo}
                        >
                            Cadastre-se para aproveitar o melhor do site!
                        </motion.span>
                    </motion.div>
                </motion.div>

                <motion.div variants={myFadeIn} className={styles.formBlock}>
                    <CadastroProvider>
                        <FormUsuario />
                        <FormCliente />
                    </CadastroProvider>
                </motion.div>

                <ToastContainer {...toastContainerSettings} />
            </motion.main>
        </>
    );
};

Cadastro.getLayout = (page: ReactElement) => page;

export default Cadastro;