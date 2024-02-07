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
import { BiArrowBack, BiCheck, BiError, BiStore } from 'react-icons/bi';
import { CiAt } from 'react-icons/ci';
import GQLClient from 'libs/apollo';
import { gql } from '@apollo/client';
import { Button } from 'components/common/form/utils';

const REMOVER_PRODUTO = gql`
    mutation ($id: ID!) {
        deleteProduto(id: $id)
    }
`;

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

interface iFormProps {
    codigo: string;
}

interface Props {
    setUpdate: (val: boolean) => void;
    setVisible: (val: boolean) => void;
}

const DeletarProdutoForm: React.FC<Props> = ({ setUpdate, setVisible }) => {
    const { register, handleSubmit } = useForm<iFormProps>();
    const [formStatus, setFormStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');

    const [error, setError] = useState('');

    const onSubmit = handleSubmit(async (data: iFormProps) => {
        if (data.codigo != '') {
            setFormStatus('loading');

            const { data: prodData } = await GQLClient.mutate({
                mutation: REMOVER_PRODUTO,
                variables: {
                    id: data.codigo,
                },
            }).catch((e) => {
                setError(e.message);
                return { data: null };
            });

            const produto = prodData?.deleteProduto;

            if (produto) {
                setUpdate(true);
                setFormStatus('success');

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
            setError('Digite o código do produto!');

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
                    title={'Deletar Produto'}
                    size={{ icon: 'text-3xl', title: 'text-2xl' }}
                    color={'text-violet-600'}
                />

                <Divider $margin="mt-2 mb-4" />

                <InputContainer $size={12}>
                    <Label className="w-full text-center text-lg">Código</Label>
                    <InputIcon
                        register={register}
                        name="codigo"
                        icon={<CiAt />}
                        placeholder="Código"
                    />
                </InputContainer>

                <div className="my-4" />

                <Button $isColored={true} type="submit">
                    Remover
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
                <span className="text-center text-xl text-violet-900">
                    Removido com sucesso!
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

export default DeletarProdutoForm;
