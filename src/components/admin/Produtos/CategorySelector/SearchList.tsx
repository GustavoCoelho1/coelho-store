import { useEffect, useState, useContext } from 'react';
import GQLClient from 'libs/apollo';
import { iItemProps } from '.';
import { gql } from '@apollo/client';

const CATEGORIAS_POR_NOME = gql`
    query ($name: String!) {
        categoriasByName(name: $name) {
            cat_nome
            cat_cod
        }
    }
`;

interface Props {
    setSelected: (val: iItemProps) => void;

    setVisible: (val: boolean) => void;
    search: string;
}

interface iListItem {
    cat_cod: string;
    cat_nome: string;
}

const SearchList: React.FC<Props> = ({ setSelected, setVisible, search }) => {
    const [list, setList] = useState<iListItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const searchCategory = async (categoryName: string) => {
        setIsLoading(true);

        const { data } = await GQLClient.query({
            query: CATEGORIAS_POR_NOME,
            variables: {
                name: categoryName,
            },
        });

        const res = data?.categoriasByName;

        setIsLoading(false);

        return res;
    };

    const handleItemClick = (newValue: iListItem) => {
        setSelected({
            id: newValue.cat_cod,
            name: newValue.cat_nome,
        });

        setVisible(false);
    };

    useEffect(() => {
        if (search.length >= 1) {
            searchCategory(search).then((categories) => {
                setList(categories);
            });
        }
    }, [search]);

    return (
        <div className="flex w-full flex-col items-center">
            {search.length >= 1 ? (
                list?.length > 0 ? (
                    list.map((category) => (
                        <div
                            onClick={() => handleItemClick(category)}
                            key={category.cat_cod}
                            className="flex w-5/6 cursor-pointer justify-center border-b border-violet-200 py-2"
                        >
                            <span className="text-center">
                                {category.cat_nome}
                            </span>
                        </div>
                    ))
                ) : isLoading ? (
                    <span>Carregando...</span>
                ) : (
                    <span>Categoria não encontrada!</span>
                )
            ) : (
                <span>Digite o nome da categoria</span>
            )}
        </div>
    );
};

export default SearchList;
