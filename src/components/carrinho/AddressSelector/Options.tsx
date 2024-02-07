import { useEffect, useState, useContext } from 'react';
import { iItemProps } from '.';
import { gql, useQuery } from '@apollo/client';
import SelectorOptionsContainer from 'components/common/ui/SelectorListContainer';
import CartContext from 'contexts/CartContext';
import { useSession } from 'next-auth/react';
import { BiHome } from 'react-icons/bi';
import { iEndereco } from 'types/Endereco';

const ENDERECO_CLIENTE = gql`
    query ($id: ID!) {
        ENDERECO_CLIENTE: clienteByUserId(id: $id) {
            cliente_endereco {
                endereco {
                    end_cod
                    end_rua
                    end_bairro
                    end_cep
                    end_cidade
                    end_estado
                    end_ruanum
                }
            }
        }
    }
`;

interface iOptionsItem {
    id: string;
    name: string;
}

interface Props {
    setSelected: (val: iItemProps) => void;
    visible: boolean;
    setVisible: (val: boolean) => void;
}

const Options: React.FC<Props> = ({ setSelected, visible, setVisible }) => {
    const {
        data: { user },
    } = useSession();

    const enderecoRequest = useQuery(ENDERECO_CLIENTE, {
        variables: { id: user.id },
    });

    const [options, setOptions] = useState<iOptionsItem[]>([]);
    const { setAddress } = useContext(CartContext);

    useEffect(() => {
        if (options.length > 0) {
            setAddress(options[0]);
        } else {
            if (enderecoRequest.loading) {
                setAddress({ id: '', name: 'Carregando...' });
            } else if (enderecoRequest.data) {
                const enderecosOptions =
                    enderecoRequest.data?.ENDERECO_CLIENTE?.cliente_endereco;

                enderecosOptions.forEach((item) => {
                    const endereco = item.endereco as iEndereco;

                    const enderecoText =
                        endereco.end_rua +
                        ', ' +
                        endereco.end_ruanum +
                        ' - ' +
                        endereco.end_cidade +
                        ', ' +
                        endereco.end_estado +
                        ' - ' +
                        endereco.end_cep;

                    setOptions([
                        ...options,
                        { id: endereco.end_cod, name: enderecoText },
                    ]);
                });
            } else {
                setAddress({
                    id: '',
                    name: 'Houve um erro ao procurar o endereço!',
                });
            }
        }
    }, [enderecoRequest, options]);

    const handleItemClick = (newValue: iOptionsItem) => {
        setSelected({
            id: newValue.id,
            name: newValue.name,
        });

        setVisible(false);
    };

    return (
        <SelectorOptionsContainer visible={visible} setVisible={setVisible}>
            <span className="flex items-center text-violet-400">
                <BiHome className="mr-2 text-lg" />
                Selecione um endereço
            </span>

            <div className="my-2 h-0.5 w-11/12 rounded-xl bg-violet-100" />

            {options?.length > 0 ? (
                options.map((address) => (
                    <div
                        onClick={() => handleItemClick(address)}
                        key={address.id}
                        className="flex w-5/6 cursor-pointer justify-center border-b border-violet-200 py-2"
                    >
                        <span className="text-center text-violet-900">
                            {address.name}
                        </span>
                    </div>
                ))
            ) : (
                <span>Nenhum endereço encontrado!</span>
            )}
        </SelectorOptionsContainer>
    );
};

export default Options;
