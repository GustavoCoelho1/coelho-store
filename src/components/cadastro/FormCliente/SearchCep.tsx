import {
    InputContainer,
    InputTextMask,
    Label,
} from 'components/common/form/utils';
import { useState } from 'react';
import {
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form';
import { BiCheck, BiSearchAlt } from 'react-icons/bi';
import { ColorRing } from 'react-loader-spinner';
import styles from 'styles/Cadastro.module.scss';
import { iCliente, iEndereco } from 'types/CadastroData';

interface Props {
    formState: {
        register: UseFormRegister<iCliente & iEndereco>;
        setValue: UseFormSetValue<iCliente & iEndereco>;
        getValues: UseFormGetValues<iCliente & iEndereco>;
    };
}

interface iCEPSearchResponse {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
}

const SearchCep: React.FC<Props> = ({
    formState: { register, setValue, getValues },
}) => {
    const [cepSearchIcon, setCepSearchIcon] = useState<
        'initial' | 'loading' | 'loaded'
    >('initial');

    const onClickSearchCep = async () => {
        const cepValue = getValues('cep');

        if (cepValue.length === 9 && !cepValue.includes('_')) {
            setCepSearchIcon('loading');

            const cepValueArr = cepValue.split('-');
            const cepFormatted = cepValueArr[0] + cepValueArr[1];

            fetch('https://viacep.com.br/ws/' + cepFormatted + '/json')
                .then(async (response) => {
                    const searchReponse = await response.json();

                    if (!searchReponse.erro) {
                        const enderecoInfo: iCEPSearchResponse = searchReponse;

                        setValue('bairro', enderecoInfo.bairro);
                        setValue('rua', enderecoInfo.logradouro);
                        setValue('cidade', enderecoInfo.localidade);
                        setValue('estado', enderecoInfo.uf);

                        setCepSearchIcon('loaded');

                        setTimeout(() => {
                            setCepSearchIcon('initial');
                        }, 2000);
                    } else {
                        throw new Error(
                            'Não foi possível encontrar o CEP informado! Tente novamente mais tarde',
                        );
                    }
                })
                .catch((err) => {
                    alert(err);
                });
        } else {
            alert('Atenção: Preencha o CEP completo antes de pesquisá-lo!');
        }
    };

    return (
        <InputContainer $size={5} $pr={true}>
            <Label>CEP</Label>
            <div className="relative flex w-full items-center justify-center">
                <InputTextMask
                    {...register('cep')}
                    mask="99999-999"
                    placeholder="00000-000"
                    required={true}
                />
                <button
                    onClick={onClickSearchCep}
                    className={styles.btnPesquisaCep}
                    type="button"
                >
                    {cepSearchIcon === 'initial' ? (
                        <BiSearchAlt />
                    ) : cepSearchIcon === 'loading' ? (
                        <ColorRing
                            visible={true}
                            height="18"
                            width="18"
                            ariaLabel="blocks-loading"
                            wrapperClass="blocks-wrapper"
                            colors={[
                                '#a78bfa',
                                '#a78bfa',
                                '#a78bfa',
                                '#a78bfa',
                                '#a78bfa',
                            ]}
                        />
                    ) : (
                        <BiCheck />
                    )}
                </button>
            </div>
        </InputContainer>
    );
};

export default SearchCep;
