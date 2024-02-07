import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { BiArrowBack, BiSearchAlt, BiCheck } from 'react-icons/bi';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { iCliente, iEndereco } from 'types/CadastroData';
import CadastroContext from 'contexts/CadastroContext';
import { easeIn, myFadeInUp } from 'animations/myAnimations';
import styles from 'styles/Cadastro.module.scss';
import ButtonSubmit from './ButtonSubmit';
import SearchCep from './SearchCep';
import {
    InputContainer,
    InputText,
    Label,
    InputTextMask,
} from '../../common/form/utils';

const thisVariant = {
    show: {
        display: 'flex',
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
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

const FormCliente: React.FC = () => {
    const { register, handleSubmit, getValues, setValue } = useForm<
        iCliente & iEndereco
    >();
    const {
        formData,
        formActive,
        setFormData,
        setFormActive,
        setFormSubmited,
    } = useContext(CadastroContext);

    const thisAnimate = formActive === 'cliente' ? 'show' : 'hide';

    const searchCepProps = {
        formState: {
            register,
            getValues,
            setValue,
        },
    };

    const onClickBack = () => {
        setFormActive('usuario');
    };

    const onSubmit = handleSubmit((data: iCliente & iEndereco) => {
        const celularValue = getValues('celular');
        const cepValue = getValues('cep');

        if (celularValue.includes('_')) {
            toast.error(
                'Preencha o campo de celular antes de enviar o formulário!',
            );
        } else if (cepValue.includes('_')) {
            toast.error(
                'Preencha o campo de CEP antes de enviar o formulário!',
            );
        } else {
            const newFormData = {
                ...formData,

                cliente: {
                    nome: data.nome,
                    celular: data.celular,
                    idade: parseInt(data.idade.toString()),
                } as iCliente,

                endereco: {
                    cep: data.cep,
                    bairro: data.bairro,
                    cidade: data.cidade,
                    estado: data.estado,
                    rua: data.rua,
                    ruanum: parseInt(data.ruanum.toString()),
                } as iEndereco,
            };
            setFormData(newFormData);
            setFormSubmited(true);
        }
    });

    return (
        <motion.form
            key={'Cliente'}
            onSubmit={onSubmit}
            initial={false}
            animate={thisAnimate}
            variants={thisVariant}
            className={styles.form + ' relative pt-10'}
        >
            <motion.div
                whileHover={{ x: -3, scale: 1.1 }}
                onClick={onClickBack}
                className="absolute left-4 top-4 z-10 cursor-pointer"
            >
                <BiArrowBack className="text-xl text-violet-600" />
            </motion.div>

            <div className={styles.inputsBlock}>
                <div className="flex w-full flex-col md:flex-row">
                    <InputContainer variants={myFadeInUp} $size={5} $pr={true}>
                        <Label>Nome Completo</Label>
                        <InputText
                            {...register('nome')}
                            type="text"
                            placeholder="Insira seu nome completo"
                            required={true}
                        />
                    </InputContainer>

                    <InputContainer $size={5} $pr={true}>
                        <Label>Celular</Label>
                        <InputTextMask
                            {...register('celular')}
                            mask="(99) 99999-9999"
                            placeholder="(00) 90000-0000"
                            required={true}
                        />
                    </InputContainer>

                    <InputContainer variants={myFadeInUp} $size={2}>
                        <Label>Idade</Label>
                        <InputText
                            {...register('idade')}
                            $center={true}
                            type="number"
                            min={0}
                            max={120}
                            placeholder="0"
                            required={true}
                        />
                    </InputContainer>
                </div>

                <div className={styles.divider}></div>

                <div className="flex w-full flex-col md:flex-row">
                    <SearchCep {...searchCepProps} />

                    <InputContainer $size={2} $pr={true}>
                        <Label>UF</Label>
                        <InputText
                            {...register('estado')}
                            $center={true}
                            type="text"
                            maxLength={2}
                            placeholder="UF"
                            required={true}
                        />
                    </InputContainer>

                    <InputContainer $size={5}>
                        <Label>Cidade</Label>
                        <InputText
                            {...register('cidade')}
                            type="text"
                            placeholder="Ciadade"
                            required={true}
                        />
                    </InputContainer>
                </div>

                <div className={styles.divider}></div>

                <div className="mb-8 flex w-full flex-col md:flex-row">
                    <InputContainer $size={5} $pr={true}>
                        <Label>Bairro</Label>
                        <InputText
                            {...register('bairro')}
                            type="text"
                            placeholder="Bairro"
                            required={true}
                        />
                    </InputContainer>

                    <InputContainer $size={5} $pr={true}>
                        <Label>Rua</Label>
                        <InputText
                            {...register('rua')}
                            type="text"
                            placeholder="Rua"
                            required={true}
                        />
                    </InputContainer>

                    <InputContainer $size={2}>
                        <Label>Núm.</Label>
                        <InputText
                            {...register('ruanum')}
                            $center={true}
                            type="number"
                            min={0}
                            placeholder="0"
                            required={true}
                        />
                    </InputContainer>
                </div>
            </div>

            <ButtonSubmit />
        </motion.form>
    );
};

export default FormCliente;
