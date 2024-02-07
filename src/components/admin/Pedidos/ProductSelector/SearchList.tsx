import { useEffect, useState, useContext } from 'react';
import GQLClient from 'libs/apollo';
import ItemContext from '../AddPedido/ItensPedido/ItemContext';
import { gql } from '@apollo/client';

const PRODUTOS_POR_NOME = gql`
    query ($name: String!) {
        produtosByName(name: $name) {
            prod_cod
            prod_nome
            prod_preco
        }
    }
`;

interface Props {
    setVisible: (val: boolean) => void;
    search: string;
}

interface iProdData {
    prod_cod: string;
    prod_nome: string;
}

const SearchList: React.FC<Props> = ({ setVisible, search }) => {
    const [products, setProducts] = useState<iProdData[]>([]);
    const { item, setItem } = useContext(ItemContext);

    const searchProduct = async (productName: string) => {
        const { data } = await GQLClient.query({
            query: PRODUTOS_POR_NOME,
            variables: {
                name: productName,
            },
        });

        const res = data?.produtosByName;

        return res;
    };

    const handleItemClick = (produto) => {
        setItem({
            ...item,
            produto: {
                id: produto.prod_cod,
                name: produto.prod_nome,
            },
            vunit: produto.prod_preco,
        });

        setVisible(false);
    };

    useEffect(() => {
        if (search.length >= 1) {
            searchProduct(search).then((produtos) => {
                setProducts(produtos);
            });
        }
    }, [search]);

    return (
        <div className="w-full flex flex-col items-center">
            {search.length >= 1 ? (
                products?.length > 0 ? (
                    products.map((produto) => (
                        <div
                            className="w-5/6 py-2 flex justify-center border-b border-violet-200 cursor-pointer"
                            onClick={() => handleItemClick(produto)}
                            key={produto.prod_cod}
                        >
                            <span className="text-center">
                                {produto.prod_nome}
                            </span>
                        </div>
                    ))
                ) : (
                    <span>Produto não encontrado!</span>
                )
            ) : (
                <span>Digite o nome do produto</span>
            )}
        </div>
    );
};

export default SearchList;
