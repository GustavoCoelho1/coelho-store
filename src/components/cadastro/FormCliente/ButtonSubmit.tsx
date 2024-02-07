import { motion } from 'framer-motion';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import Router from 'next/router';

import { myFadeInUp } from 'animations/myAnimations';
import styles from 'styles/Cadastro.module.scss';
import GQLClient from 'libs/apollo';
import CadastroContext from 'contexts/CadastroContext';
import { gql } from '@apollo/client';

const CADASTRAR_USUARIO = gql`
    mutation ($data: iUsuarioComplete!) {
        createUsuarioComplete(data: $data) {
            cliente {
                cli_cod
            }
            endereco {
                end_cod
            }
            usuario {
                user_cod
            }
        }
    }
`;

const ButtonSubmit = () => {
    const { formSubmited, formData, setFormSubmited } =
        useContext(CadastroContext);

    const cadastrar = async () => {
        const { data: requestData } = await GQLClient.mutate({
            mutation: CADASTRAR_USUARIO,
            variables: {
                data: formData,
            },
        }).catch((err) => {
            return { data: { erro: err.message } };
        });

        if (!requestData.erro) {
            return true;
        } else {
            throw new Error(requestData.erro);
        }
    };

    useEffect(() => {
        if (formSubmited) {
            const newToast = toast.loading('Por favor, aguarde...');

            const submitForm = async () => {
                cadastrar()
                    .then((response) => {
                        if (response) {
                            toast.update(newToast, {
                                render: 'O usuário foi cadastrado com sucesso! 👌',
                                type: 'success',
                                isLoading: false,
                                autoClose: 3000,
                            });
                            setTimeout(() => {
                                Router.push('/Login');
                            }, 3000);
                        }
                    })
                    .catch((err) => {
                        toast.update(newToast, {
                            render: `${err.message}`,
                            type: 'error',
                            isLoading: false,
                            autoClose: 3000,
                        });
                        setFormSubmited(false);
                    });
            };

            submitForm();
        }
    }, [formSubmited]);

    return (
        <motion.input
            value="Cadastrar-se"
            type="submit"
            variants={myFadeInUp}
            className={styles.btnSubmit}
            disabled={formSubmited}
        />
    );
};

export default ButtonSubmit;
