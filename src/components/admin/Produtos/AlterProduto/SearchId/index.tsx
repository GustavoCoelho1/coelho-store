import {
    InputContainer,
    InputTextMask,
    Label,
} from 'components/common/form/utils';
import InputIcon from 'components/common/form/InputIcon';
import { useState } from 'react';
import {
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form';
import { BiCheck, BiSearchAlt } from 'react-icons/bi';
import { CiHashtag } from 'react-icons/ci';
import { ColorRing } from 'react-loader-spinner';
import styles from 'styles/Cadastro.module.scss';
import GQLClient from 'libs/apollo';
import { gql } from '@apollo/client';
import { toast } from 'react-toastify';
import { iProduto } from 'types/Produto';

const PRODUTO_POR_ID = gql`
    query ($id: ID!) {
        produtoById(id: $id) {
            prod_nome
            prod_preco
            prod_estoque
            prod_descricao
            prod_codbarra
            marca {
                marca_cod
                marca_nome
            }
            categoria {
                cat_nome
                cat_cod
            }
            produto_imagem {
                img_link
            }
        }
    }
`;

interface Props {
    value: string;
    setValue: (val: string) => void;
    setForm: {
        setCodigo: (val: any) => void;
        setNome: (val: any) => void;
        setPreco: (val: any) => void;
        setEstoque: (val: any) => void;
        setMarca: (val: any) => void;
        setCodbarra: (val: any) => void;
        setDescricao: (val: any) => void;
        setCategoria: (val: any) => void;
        setImagesList: (val: any) => void;
    };
}

const SearchId: React.FC<Props> = ({ value, setValue, setForm }) => {
    const [cepSearchIcon, setCepSearchIcon] = useState<
        'initial' | 'loading' | 'loaded'
    >('initial');

    const onClickSearch = async () => {
        const { data: prodData } = await GQLClient.query({
            query: PRODUTO_POR_ID,
            variables: {
                id: value,
            },
        }).catch((err) => {
            return { data: { erro: err.message } };
        });

        if (!prodData.erro) {
            const produto = prodData?.produtoById as iProduto;

            setForm.setNome(produto.prod_nome);
            setForm.setPreco(produto.prod_preco);
            setForm.setCodbarra(produto.prod_codbarra);
            setForm.setCategoria({
                id: produto.cat_cod_fk,
                name: produto.categoria.cat_nome,
            });
            setForm.setMarca({
                id: produto.marca_cod_fk,
                name: produto.marca.marca_nome,
            });
            setForm.setDescricao(produto.prod_descricao);
            setForm.setEstoque(produto.prod_estoque);
            setForm.setImagesList(
                produto.produto_imagem.map((image) => {
                    return { link: image.img_link };
                }),
            );
        } else {
            toast.error(prodData.erro);
        }
    };

    return (
        <div className="w-full">
            <div className="relative flex w-full items-center justify-center">
                <InputIcon
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    extra={'pr-10'}
                    icon={<CiHashtag />}
                    placeholder={'Código'}
                    required
                />
                <button
                    onClick={onClickSearch}
                    className={
                        'absolute right-3 h-full text-lg text-violet-400 transition duration-700 ease-out hover:text-violet-600'
                    }
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
        </div>
    );
};

export default SearchId;
