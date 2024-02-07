import { useForm } from 'react-hook-form';
import { motion, MotionAdvancedProps } from 'framer-motion';
import { useContext } from 'react';

import { iUsuario } from 'types/CadastroData';
import CadastroContext from 'contexts/CadastroContext';
import animate from 'animations';
import { easeIn } from 'animations/myAnimations';
import Link from 'next/link';
import styles from 'styles/Cadastro.module.scss';
import { myFadeInUp } from 'animations/myAnimations';
import { InputContainer, InputText, Label } from 'components/common/form/utils';

const thisVariant = {
    show: {
        display: 'flex',
        opacity: 1,
        transition: {
            delay: 0.8,
            ease: easeIn,
            duration: 0.8,
        },
    },

    hide: {
        opacity: 0,
        transition: {
            ease: easeIn,
            duration: 0.8,
        },
        transitionEnd: {
            display: 'none',
        },
    },
};

const FormUsuario: React.FC = () => {
    const { register, handleSubmit } = useForm<iUsuario>();
    const { formData, formActive, setFormData, setFormActive } =
        useContext(CadastroContext);

    const onSubmit = handleSubmit((data) => {
        console.log(formActive);
        const newFormData = { ...formData, usuario: data };

        setFormData(newFormData);
        setFormActive('cliente');
    });

    const thisAnimate = formActive === 'usuario' ? 'show' : 'hide';

    return (
        <motion.form
            key={'Usuário'}
            onSubmit={onSubmit}
            initial={false}
            animate={thisAnimate}
            variants={thisVariant}
            className={styles.formBlock}
        >
            <motion.div
                initial="initial"
                animate="animate"
                variants={animate.stagger(0.2)}
                className={styles.form}
            >
                <div className={styles.inputsBlock}>
                    <InputContainer
                        variants={myFadeInUp}
                        $size={12}
                        $mb={'mb-8'}
                    >
                        <Label>Nome de Usuário</Label>
                        <InputText
                            {...register('nome')}
                            type="text"
                            placeholder="Crie um nome de usuário"
                            required={true}
                        />
                    </InputContainer>

                    <InputContainer
                        variants={myFadeInUp}
                        $size={12}
                        $mb={'mb-8'}
                    >
                        <Label>E-mail</Label>
                        <InputText
                            {...register('email')}
                            type="email"
                            placeholder="Insira seu e-mail"
                            required={true}
                        />
                    </InputContainer>

                    <InputContainer
                        variants={myFadeInUp}
                        $size={12}
                        $mb={'mb-8'}
                    >
                        <Label>Senha</Label>
                        <InputText
                            {...register('senha')}
                            type="password"
                            placeholder="Crie uma senha"
                            required={true}
                        />
                    </InputContainer>
                </div>

                <motion.input
                    whileHover={{ scale: 1.05 }}
                    value="Próximo"
                    type="submit"
                    variants={myFadeInUp}
                    className={styles.btnSubmit}
                />

                <motion.span
                    variants={myFadeInUp}
                    className={styles.signMessage}
                >
                    Já possui uma conta?{' '}
                    <Link href="/Login">
                        <span className="cursor-pointer text-violet-600">
                            Faça Login
                        </span>
                    </Link>
                </motion.span>
            </motion.div>
        </motion.form>
    );
};

export default FormUsuario;
