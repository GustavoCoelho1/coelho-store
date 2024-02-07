import { useState } from 'react';
import { motion } from 'framer-motion';
import { ThreeDots } from 'react-loader-spinner';

import InputIcon from 'components/common/form/InputIcon';
import {
    Divider,
    InputContainer,
    InputText,
    Label,
} from 'components/common/form/utils';
import IconTitle from 'components/common/ui/IconTitle';
import { useForm } from 'react-hook-form';
import { BiCheck, BiError, BiStore } from 'react-icons/bi';
import { CiAt } from 'react-icons/ci';
import { Button } from 'components/common/form/utils';
import GQLClient from 'libs/apollo';
import { gql } from '@apollo/client';

const CRIAR_MARCA = gql`
    mutation ($data: iMarca!) {
        createMarca(data: $data) {
            marca_cod
        }
    }
`;

interface iFormProps {
    nome: string;
}

interface Props {
    setUpdate: (val: boolean) => void;
    setVisible: (val: boolean) => void;
}

const formVariants = {
    show: {
        display: 'flex',
        opacity: 1,
        transition: {
            duration: 0.3,
            delay: 0.3,
        },
    },
    hide: {
        opacity: 0,
        transition: {
            duration: 0.3,
        },
        transitionEnd: { display: 'none' },
    },
};

const AddMarcaForm: React.FC<Props> = ({ setUpdate, setVisible }) => {
    const { register, handleSubmit } = useForm<iFormProps>();
    const [formStatus, setFormStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');
    const [error, setError] = useState('');

    const onSubmit = handleSubmit(async (data: iFormProps) => {
        if (data.nome != '') {
            setFormStatus('loading');

            const { data: marcaData } = await GQLClient.mutate({
                mutation: CRIAR_MARCA,
                variables: {
                    data,
                },
            }).catch((e) => {
                setError(e.message);
                return { data: null };
            });

            const marca = marcaData?.createMarca;

            if (marca) {
                setFormStatus('success');
                setUpdate(true);
                setTimeout(() => {
                    setVisible(false);
                    setFormStatus('idle');
                }, 2500);
            } else {
                setFormStatus('error');

                setTimeout(() => {
                    setFormStatus('idle');
                }, 2500);
            }
        } else {
            setFormStatus('error');
            setError('Digite o nome da marca!');

            setTimeout(() => {
                setFormStatus('idle');
            }, 2500);
        }
    });

    return (
        <form className="h-full w-full" onSubmit={onSubmit}>
            <motion.div
                className="flex w-full flex-col items-center"
                initial={false}
                animate={formStatus === 'idle' ? 'show' : 'hide'}
                variants={formVariants}
            >
                <IconTitle
                    icon={<BiStore />}
                    title={'Adicionar Marca'}
                    size={{ icon: 'text-3xl', title: 'text-2xl' }}
                    color={'text-violet-600'}
                />

                <Divider $margin="mt-2 mb-4" />

                <InputContainer $size={12}>
                    <Label className="w-full text-center text-lg">
                        Nome da Marca
                    </Label>
                    <InputIcon
                        register={register}
                        name="nome"
                        icon={<CiAt />}
                        placeholder="Marca"
                    />
                </InputContainer>

                <div className="my-4" />

                <Button $isColored={true} type="submit">
                    Adicionar
                </Button>
            </motion.div>

            <motion.div
                initial={false}
                animate={formStatus === 'loading' ? 'show' : 'hide'}
                variants={formVariants}
                className="flex h-full w-full items-center justify-center"
            >
                <ThreeDots
                    width="100"
                    height="100"
                    color="#7c3aed"
                    ariaLabel="Loading..."
                />
            </motion.div>

            <motion.div
                initial={false}
                animate={formStatus === 'success' ? 'show' : 'hide'}
                variants={formVariants}
                className="flex h-full w-full flex-col items-center justify-center"
            >
                <BiCheck className="mb-2 text-6xl text-violet-900" />
                <span className="text-xl text-violet-900">
                    Adicionado com sucesso!
                </span>
            </motion.div>

            <motion.div
                initial={false}
                animate={formStatus === 'error' ? 'show' : 'hide'}
                variants={formVariants}
                className="flex h-full w-full flex-col items-center justify-center"
            >
                <BiError className="mb-2 text-6xl text-violet-900" />
                <span className="text-xl text-violet-900">{error}</span>
            </motion.div>
        </form>
    );
};

export default AddMarcaForm;
