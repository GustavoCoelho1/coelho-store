import { gql, useQuery } from '@apollo/client';
import Modal from 'components/common/ui/Modal';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { iCliente } from 'types/Cliente';
import { iPedido } from 'types/Pedido';

const TODOS_PEDIDOS_CLIENTE = gql`
    query ($id: ID!) {
        TODOS_PEDIDOS_CLIENTE: pedidosByClientId(id: $id) {
            ped_cod
            ped_data
            ped_status
            ped_valortotal
            item_pedido {
                item_descricao
                item_quantidade
                item_vlrunitario
                item_vlrtotal
                produto {
                    produto_imagem {
                        img_link
                    }
                }
            }
        }
    }
`;

interface Props {
    client: iCliente;
}

const MyOrder: React.FC<Props> = ({ client }) => {
    const { data, loading, error } = useQuery(TODOS_PEDIDOS_CLIENTE, {
        variables: { id: client.cli_cod },
    });

    return (
        <div className="flex w-full items-center justify-center">
            {data ? (
                <div>
                    {data.TODOS_PEDIDOS_CLIENTE.map((pedido: iPedido) => {
                        return (
                            <div
                                key={`pedido-${pedido.ped_cod}`}
                                className="flex w-full rounded-3xl p-4 shadow-sm"
                            >
                                <div className="relative h-20 w-20">
                                    <img
                                        className="absolute h-full w-full rounded-2xl object-cover"
                                        src={
                                            pedido.item_pedido[0].produto
                                                .produto_imagem[0].img_link
                                        }
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <span>
                                        {pedido.item_pedido[0].item_descricao}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : loading ? (
                <MoonLoader color="white" size={40} />
            ) : (
                <span>Ocorreu um erro ao tentar buscar os pedidos!</span>
            )}
        </div>
    );
};

export default MyOrder;
