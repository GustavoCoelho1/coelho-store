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

    const searchBrand = async (brandName: string) => {
        const { data } = await GQLClient.query({
            query: MARCAS_POR_NOME,
            variables: {
                name: brandName,
            },
        });

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
        <div className="w-full flex flex-col items-center">
            {search.length >= 1 ? (
                list?.length > 0 ? (
                    list.map((brand) => (
                        <div
                            onClick={() => handleItemClick(brand)}
                            key={brand.marca_cod}
                            className="w-5/6 py-2 flex justify-center border-b border-violet-200 cursor-pointer"
                        >
                            <span className="text-center">
                                {brand.marca_nome}
                            </span>
                        </div>
                    ))
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
