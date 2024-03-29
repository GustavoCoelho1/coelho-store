import { motion } from 'framer-motion';
import LoadingPage from 'components/common/ui/LoadingPage';
import Table from 'components/common/ui/DataTable';
import Card from 'components/common/ui/Card';

import { BiAddToQueue, BiArrowBack, BiEdit, BiStore } from 'react-icons/bi';
import { MdRemoveCircleOutline } from 'react-icons/md';

import Head from 'next/head';
import ActionButton from 'components/common/ui/ActionButton';
import IcontTitle from 'components/common/ui/IconTitle';
import { FiShoppingBag, FiClock } from 'react-icons/fi';
import { MdManageAccounts } from 'react-icons/md';
import { GetServerSideProps, NextPage } from 'next';
import Modal from 'components/common/ui/Modal';
import { useEffect, useState } from 'react';
import AddMarcaForm from 'components/admin/Marca/AddMarca';
import AlterarMarcaForm from 'components/admin/Marca/AlterarMarca';
import DeletarMarcaForm from 'components/admin/Marca/DeletarMarca';
import GQLClient from 'libs/apollo';
import { gql } from '@apollo/client';

const TODAS_MARCAS = gql`
    query {
        TODAS_MARCAS: allMarcas {
            marca_cod
            marca_nome
        }
    }
`;

const marcaColumns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'nome', headerName: 'Marca', width: 150 },
];

interface iMarcaProps {
    marca_cod: string;
    marca_nome: string;
}

interface AuthProps {
    auth: {
        role: string;
        loading: JSX.Element;
        unauthorized: string;
    };
}

const Marca: NextPage & AuthProps = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState<JSX.Element>();

    const [tableData, setTableData] = useState<any[]>([{ id: '', nome: '' }]);
    const [updateTable, setUpdateTable] = useState(false);

    const handleAddClick = () => {
        setModalContent(
            <AddMarcaForm
                setUpdate={setUpdateTable}
                setVisible={setModalVisible}
            />,
        );
        setModalVisible(true);
    };

    const handleAlterClick = () => {
        setModalContent(
            <AlterarMarcaForm
                setUpdate={setUpdateTable}
                setVisible={setModalVisible}
            />,
        );
        setModalVisible(true);
    };

    const handleDelClick = () => {
        setModalContent(
            <DeletarMarcaForm
                setUpdate={setUpdateTable}
                setVisible={setModalVisible}
            />,
        );
        setModalVisible(true);
    };

    const updateTableData = async () => {
        const { data: marcaData } = await GQLClient.query({
            query: TODAS_MARCAS,
        }).finally(() => {
            GQLClient.clearStore();
        });

        const marcas = marcaData?.TODAS_MARCAS;

        if (marcas) {
            const marcasSerialized = marcas.map((marca: iMarcaProps) => {
                return {
                    id: marca.marca_cod,
                    nome: marca.marca_nome,
                };
            });

            return marcasSerialized;
        }
    };

    useEffect(() => setUpdateTable(true), []);

    useEffect(() => {
        if (updateTable === true) {
            updateTableData().then((newRows) => {
                setTableData(newRows);
                setUpdateTable(false);
            });
        }
    }, [updateTable]);

    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <motion.div
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex w-full justify-center bg-violet-100 sm:py-10"
            >
                <Card width="w-10/12 justify-start">
                    <div className="flex w-full flex-col items-center">
                        <span className="my-4 flex items-center text-3xl text-violet-600 sm:mb-0 sm:mt-2">
                            <BiStore className="mr-3" />
                            <span>Marcas</span>
                        </span>

                        <div className="my-8 h-0.5 w-4/6 rounded-xl bg-violet-200" />

                        <div>
                            <IcontTitle
                                icon={<MdManageAccounts />}
                                title="Gerenciamento"
                            />

                            <div className="mt-6 flex">
                                <div
                                    onClick={() => handleAddClick()}
                                    className="mx-4 sm:mx-8"
                                >
                                    <ActionButton
                                        icon={<BiAddToQueue />}
                                        title={'Adicionar'}
                                    />
                                </div>
                                <div
                                    onClick={() => handleAlterClick()}
                                    className="mx-4 sm:mx-8"
                                >
                                    <ActionButton
                                        icon={<BiEdit />}
                                        title={'Alterar'}
                                    />
                                </div>
                                <div
                                    onClick={() => handleDelClick()}
                                    className="mx-4 sm:mx-8"
                                >
                                    <ActionButton
                                        icon={<MdRemoveCircleOutline />}
                                        title={'Remover'}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="my-8 h-0.5 w-4/6 rounded-xl bg-violet-200" />

                        <div className="flex w-11/12 flex-col items-center">
                            <IcontTitle
                                icon={<FiClock />}
                                title={'Últimas marcas'}
                            />
                            <Table columns={marcaColumns} rows={tableData} />
                        </div>
                    </div>
                </Card>
            </motion.div>

            <Modal
                show={modalVisible}
                handleClose={() => setModalVisible(false)}
            >
                {modalContent}
            </Modal>
        </>
    );
};

Marca.auth = {
    role: 'admin',
    loading: <LoadingPage />,
    unauthorized: '/Login',
};

export default Marca;
