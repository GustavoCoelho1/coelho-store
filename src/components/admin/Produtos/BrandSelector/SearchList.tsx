import { useEffect, useState, useContext } from 'react';
import GQLClient from 'libs/apollo';
import { iItemProps } from '.';
import { gql } from '@apollo/client';

const MARCAS_POR_NOME = gql`
    query ($name: String!) {
        marcasByName(name: $name) {
            marca_nome
            marca_cod
        }
    }
`;

interface Props {
    setSelected: (val: iItemProps) => void;

    setVisible: (val: boolean) => void;
    search: string;
}

interface iListItem {
    marca_cod: string;
    marca_nome: string;
}

const SearchList: React.FC<Props> = ({ setSelected, setVisible, search }) => {
    const [list, setList] = useState<iListItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const searchBrand = async (brandName: string) => {
        setIsLoading(true);

        const { data } = await GQLClient.query({
            query: MARCAS_POR_NOME,
            variables: {
                name: brandName,
            },
        });

        setIsLoading(false);

        const res = data?.marcasByName;

        return res;
    };

    const handleItemClick = (newValue: iListItem) => {
        setSelected({
            id: newValue.marca_cod,
            name: newValue.marca_nome,
        });

        setVisible(false);
    };

    useEffect(() => {
        if (search.length >= 1) {
            searchBrand(search).then((brands) => {
                console.log(brands);
                setList(brands);
            });
        }
    }, [search]);

    return (
        <div className="flex w-full flex-col items-center">
            {search.length >= 1 ? (
                list?.length > 0 ? (
                    list.map((brand) => (
                        <div
                            onClick={() => handleItemClick(brand)}
                            key={brand.marca_cod}
                            className="flex w-5/6 cursor-pointer justify-center border-b border-violet-200 py-2"
                        >
                            <span className="text-center">
                                {brand.marca_nome}
                            </span>
                        </div>
                    ))
                ) : isLoading ? (
                    <span>Carregando...</span>
                ) : (
                    <span>Marca não encontrada!</span>
                )
            ) : (
                <span>Digite o nome da marca</span>
            )}
        </div>
    );
};

export default SearchList;
