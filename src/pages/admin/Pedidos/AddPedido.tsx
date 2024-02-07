import IconTitle from 'components/common/ui/IconTitle';
import { FiShoppingBag } from 'react-icons/fi';
import { AddPedidoProvider } from 'components/admin/Pedidos/AddPedido/AddPedidoContext';
import AddPedidoForm from 'components/admin/Pedidos/AddPedido';
import LoadingPage from 'components/common/ui/LoadingPage';
import Head from 'next/head';
import Modal from 'components/common/ui/Modal';
import { useState } from 'react';
import { ToastContainer, ToastContainerProps } from 'react-toastify';

const toastContainerSettings = {
    position: 'bottom-right',
    autoClose: 2000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: 'light',
} as ToastContainerProps;

const AddPedido = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState<JSX.Element>();

    return (
        <AddPedidoProvider>
            <Head>
                <title>Adicionar Pedido</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="w-full flex-col items-center p-8">
                <IconTitle
                    icon={<FiShoppingBag />}
                    title={'Adicionar Pedido'}
                    size={{ icon: 'text-3xl', title: 'text-2xl' }}
                    color={'text-violet-600'}
                />
                <AddPedidoForm
                    setModalContent={setModalContent}
                    setModalVisible={setModalVisible}
                />

                <ToastContainer {...toastContainerSettings} />
            </div>

            <Modal
                show={modalVisible}
                handleClose={() => setModalVisible(false)}
            >
                <div
                    style={{ maxWidth: '400px' }}
                    className="relative flex h-full w-11/12 flex-col items-center justify-center rounded-3xl bg-white p-8 shadow-md"
                >
                    {modalContent}
                </div>
            </Modal>
        </AddPedidoProvider>
    );
};

AddPedido.auth = {
    role: 'admin',
    loading: <LoadingPage />,
    unauthorized: '/Login',
};

export default AddPedido;
