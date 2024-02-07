import { toast } from 'react-toastify';
import GQLClient from 'libs/apollo';
import { gql } from '@apollo/client';
import { Button } from 'components/common/form/utils';
import AddPedidoContext from './AddPedidoContext';
import SuccessMessage from '../../SuccessMessage';
import { useContext } from 'react';

const ADICIONAR_PEDIDO = gql`
    mutation ($data: iPedidoCompleto) {
        createPedidoCompleto(data: $data) {
            ped_cod
        }
    }
`;

interface Props {
    resetForm: () => void;
    setModalContent: (val: JSX.Element) => void;
    setModalVisible: (val: boolean) => void;
}

const ButtonSubmit: React.FC<Props> = ({
    resetForm,
    setModalContent,
    setModalVisible,
}) => {
    const { formData } = useContext(AddPedidoContext);

    const validateFormData = () => {
        let camposPreenchidos = [];

        camposPreenchidos.push(formData.client.id != '');
        camposPreenchidos.push(formData.data != '');

        formData.orderTable.items.forEach((row) => {
            camposPreenchidos.push(row.qtd != 0);
            camposPreenchidos.push(row.produto.id != '');
        });

        camposPreenchidos.push(formData.total != 0);

        console.log(camposPreenchidos);

        const formValido = camposPreenchidos.includes(false) !== true;

        return formValido;
    };

    const onClickSubmit = async () => {
        const newToast = toast.loading('Por favor, aguarde...');

        const formValido = validateFormData();

        if (formValido) {
            const itensPedido = formData.orderTable.items.map((row) => {
                return {
                    vlrunitario: row.vunit,
                    vlrtotal: row.vtotal,
                    quantidade: row.qtd,
                    prod_cod_fk: row.produto.id,
                    descricao: row.produto.name,
                };
            });

            console.log(formData);
            console.log(itensPedido);

            const { data: pedData } = await GQLClient.mutate({
                mutation: ADICIONAR_PEDIDO,
                variables: {
                    data: {
                        pedido: {
                            cli_cod_fk: formData.client.id,
                            valortotal: formData.total,
                        },
                        item_pedido: itensPedido,
                    },
                },
            }).catch((err) => {
                return { data: { error: err.message } };
            });

            const pedido = pedData?.createPedidoCompleto;

            if (pedido) {
                toast.update(newToast, {
                    render: 'Produto cadastrado com sucesso!',
                    type: 'success',
                    isLoading: false,
                    autoClose: 2000,
                });

                setModalContent(
                    <SuccessMessage
                        title="Pedido inserido com sucesso!"
                        subtitle="Deseja cadastrar mais pedidos?"
                        exitRoute="/admin/Pedidos"
                        resetForm={resetForm}
                        setModalVisible={setModalVisible}
                    />,
                );

                setModalVisible(true);
            } else {
                toast.update(newToast, {
                    render: pedData.error,
                    type: 'error',
                    isLoading: false,
                    autoClose: 2000,
                });
            }
        } else {
            toast.error(
                'Preencha todos os campos antes de finalizar o pedido!',
            );
        }
    };

    return (
        <Button onClick={() => onClickSubmit()} $isColored={true}>
            Finalizar Pedido
        </Button>
    );
};

export default ButtonSubmit;
