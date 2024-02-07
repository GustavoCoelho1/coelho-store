import { useEffect, useState, useContext } from 'react';
import GQLClient from 'libs/apollo';
import { gql } from '@apollo/client';
import ItemContext from '../AddPedido/ItensPedido/ItemContext';
import AddPedidoContext from '../AddPedido/AddPedidoContext';

const CLIENTES_POR_NOME = gql`
    query ($name: String!) {
        clientesByName(name: $name) {
            cli_cod
            cli_nome
        }
    }
`;

interface Props {
    setVisible: (val: boolean) => void;
    search: string;
}

interface iListItem {
    cli_cod: string;
    cli_nome: string;
}

const SearchList: React.FC<Props> = ({ setVisible, search }) => {
    const [list, setList] = useState<iListItem[]>([]);
    const { formData, setFormData } = useContext(AddPedidoContext);

    const searchClient = async (clientName: string) => {
        const { data } = await GQLClient.query({
            query: CLIENTES_POR_NOME,
            variables: {
                name: clientName,
            },
        });

        const res = data?.clientesByName;

        return res;
    };

    const handleItemClick = (newValue: iListItem) => {
        setFormData({
            ...formData,
            client: {
                id: newValue.cli_cod,
                name: newValue.cli_nome,
            },
        });

        setVisible(false);
    };

    useEffect(() => {
        if (search.length >= 1) {
            searchClient(search).then((categories) => {
                setList(categories);
            });
        }
    }, [search]);

    return (
        <div className="w-full flex flex-col items-center">
            {search.length >= 1 ? (
                list?.length > 0 ? (
                    list.map((client) => (
                        <div
                            onClick={() => handleItemClick(client)}
                            key={client.cli_cod}
                            className="w-5/6 py-2 flex justify-center border-b border-violet-200 cursor-pointer"
                        >
                            <span className="text-center">
                                {client.cli_nome}
                            </span>
                        </div>
                    ))
                ) : (
                    <span>Cliente não encontrado!</span>
                )
            ) : (
                <span>Digite o nome do cliente</span>
            )}
        </div>
    );
};

export default SearchList;
