import { FormEventHandler, useEffect, useState } from 'react';
import { Divider, InputContainer, Label } from 'components/common/form/utils';
import InputIcon from 'components/common/form/InputIcon';
import ImageSelector, { iImageData } from 'components/common/ui/ImageSelector';
import GQLClient from 'libs/apollo';
import {
    CiApple,
    CiBarcode,
    CiBoxes,
    CiBoxList,
    CiDollar,
    CiGift,
    CiHashtag,
} from 'react-icons/ci';
import BrandSelector from '../BrandSelector';
import CategorySelector from '../CategorySelector';
import { Button } from 'components/common/form/utils';
import { toast } from 'react-toastify';
import { BiCheck } from 'react-icons/bi';
import Router from 'next/router';
import { gql } from '@apollo/client';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'config/firebase';
import SuccessMessage from '../../SuccessMessage';

const CRIAR_IMAGEM = gql`
    mutation ($data: iProdutoImagem!) {
        createProdutoImagem(data: $data) {
            img_cod
        }
    }
`;

const CRIAR_PRODUTO = gql`
    mutation ($data: iProduto!) {
        createProduto(data: $data) {
            prod_cod
        }
    }
`;

interface Props {
    setModalVisible: (val: boolean) => void;
    setModalContent: (val: JSX.Element) => void;
}

const AddProdutoForm: React.FC<Props> = ({
    setModalVisible,
    setModalContent,
}) => {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState(0);
    const [estoque, setEstoque] = useState(0);
    const [codbarra, setCodbarra] = useState('');
    const [descricao, setDescricao] = useState('');
    const [marca, setMarca] = useState({ id: '', name: 'Marca...' });
    const [categoria, setCategoria] = useState({
        id: '',
        name: 'Categoria...',
    });

    const [imagesList, setImagesList] = useState<iImageData[]>([]);

    const resetForm = () => {
        setNome(''),
            setCodbarra(''),
            setDescricao(''),
            setPreco(0),
            setEstoque(0);
        setMarca({ id: '', name: 'Marca...' });
        setCategoria({ id: '', name: 'Categoria...' });
        setImagesList([]);
    };

    const storeProduct = async () => {
        try {
            const { data: prodData } = await GQLClient.mutate({
                mutation: CRIAR_PRODUTO,
                variables: {
                    data: {
                        nome,
                        preco,
                        estoque,
                        descricao,
                        codbarra,
                        cat_cod_fk: categoria.id,
                        marca_cod_fk: marca.id,
                    },
                },
            });

            const produto = prodData?.createProduto;

            const result = [];

            imagesList.forEach(async (image) => {
                if (image.link) {
                    const url = image.link;

                    const { data: imgData } = await GQLClient.mutate({
                        mutation: CRIAR_IMAGEM,
                        variables: {
                            data: {
                                link: url,
                                prod_cod_fk: produto.prod_cod,
                            },
                        },
                    });

                    const imagem = imgData?.createProdutoImagem;

                    result.push(imagem ? true : false);
                } else {
                    const storageRef = ref(
                        storage,
                        `images/products/${image.file.name}`,
                    );
                    const uploadTask = uploadBytes(storageRef, image.file);

                    uploadTask.then(async (snapshot) => {
                        console.log(snapshot);

                        const url = await getDownloadURL(snapshot.ref);

                        const { data: imgData } = await GQLClient.mutate({
                            mutation: gql`
                                mutation ($data: iProdutoImagem!) {
                                    createProdutoImagem(data: $data) {
                                        img_cod
                                    }
                                }
                            `,
                            variables: {
                                data: {
                                    link: url,
                                    prod_cod_fk: produto.prod_cod,
                                },
                            },
                        });

                        const imagem = imgData?.createProdutoImagem;

                        result.push(imagem ? true : false);
                    });
                }
            });

            return result.includes(false) ? false : true;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    const onClickSubmit = async () => {
        if (
            estoque != 0 &&
            preco != 0 &&
            marca.id != '' &&
            categoria.id != '' &&
            imagesList.length > 0
        ) {
            const newToast = toast.loading('Por favor, aguarde...');

            const produto = await storeProduct();

            if (produto) {
                toast.update(newToast, {
                    render: 'Produto cadastrado com sucesso!',
                    type: 'success',
                    isLoading: false,
                    autoClose: 2000,
                });
                setModalContent(
                    <SuccessMessage
                        title="Produto inserido com sucesso!"
                        subtitle="Deseja cadastrar mais produtos?"
                        exitRoute="/admin/Produtos"
                        resetForm={resetForm}
                        setModalVisible={setModalVisible}
                    />,
                );
                setModalVisible(true);
            } else {
                console.log('Houve um erro ao cadastrar os dados de produto!');
                toast.update(newToast, {
                    render: 'Houve um erro ao cadastrar o produto!',
                    type: 'error',
                    isLoading: false,
                    autoClose: 2000,
                });
            }
        }
    };

    return (
        <div className="mt-6 flex w-full flex-col items-center">
            <div className="flex w-full max-w-full flex-col items-center sm:max-w-2xl">
                <div
                    style={{ maxWidth: '600px' }}
                    className="flex w-full flex-col"
                >
                    <div className="my-6 flex w-full flex-col sm:flex-row">
                        <InputContainer $size={6} $pr={true}>
                            <InputIcon
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                icon={<CiGift />}
                                placeholder={'Produto'}
                                required
                            />
                        </InputContainer>

                        <InputContainer $size={6}>
                            <InputIcon
                                value={codbarra}
                                onChange={(e) => setCodbarra(e.target.value)}
                                type="number"
                                icon={<CiBarcode />}
                                placeholder={'Cód. Barra'}
                                required
                            />
                        </InputContainer>
                    </div>

                    <div className="mb-6 flex w-full flex-col sm:flex-row">
                        <InputContainer $size={6} $pr={true}>
                            <div className="flex h-full w-full">
                                <div className="flex items-center rounded-l-3xl border border-violet-300 pl-4 pr-3 text-xl text-violet-500">
                                    <CiApple />
                                </div>
                                <BrandSelector
                                    item={marca}
                                    setItem={setMarca}
                                />
                            </div>
                        </InputContainer>

                        <InputContainer $size={6}>
                            <div className="flex h-full w-full">
                                <div className="flex items-center rounded-l-3xl border border-violet-300 pl-4 pr-3 text-xl text-violet-500">
                                    <CiBoxList />
                                </div>
                                <CategorySelector
                                    item={categoria}
                                    setItem={setCategoria}
                                />
                            </div>
                        </InputContainer>
                    </div>

                    <div className="flex w-full flex-col md:flex-row">
                        <InputContainer $size={6} $pr={true}>
                            <InputIcon
                                value={estoque.toString()}
                                onChange={(e) =>
                                    setEstoque(parseInt(e.target.value))
                                }
                                type="number"
                                icon={<CiBoxes />}
                                placeholder={'Estoque'}
                                required
                            />
                        </InputContainer>

                        <InputContainer $size={6}>
                            <InputIcon
                                value={preco.toString()}
                                onChange={(e) =>
                                    setPreco(parseInt(e.target.value))
                                }
                                type="number"
                                icon={<CiDollar />}
                                placeholder={'Preço'}
                                required
                            />
                        </InputContainer>
                    </div>
                </div>

                <Divider $margin="my-8" />

                <div className="flex w-full">
                    <InputContainer $size={12}>
                        <Label className="w-full text-center">Descrição</Label>
                        <textarea
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Descrição..."
                            className="w-full rounded-xl border border-violet-400 p-4 text-violet-500 selection:bg-violet-800 selection:text-white placeholder:text-violet-300 focus:outline-none"
                            required
                        />
                    </InputContainer>
                </div>

                <Divider $margin="mt-10 mb-8" />

                <div className="flex w-full flex-col items-center">
                    <Label className="w-full text-center">Imagens</Label>
                    <ImageSelector list={imagesList} setList={setImagesList} />
                </div>

                <Divider $margin="mt-8 mb-12" />
            </div>

            <Button onClick={() => onClickSubmit()} $isColored={true}>
                Adicionar
            </Button>
        </div>
    );
};

export default AddProdutoForm;
