import { createContext, useState } from 'react';

export interface iItemProps {
    rowId: number;
    qtd: number;
    produto: {
        id: string;
        name: string;
    };
    vunit: number;
    vtotal: number;
}

export interface iItem {
    item: iItemProps;
    setItem: (val: iItemProps) => void;
}

const ItemContext = createContext({} as iItem);

export const ItemProvider = ({ rowId, children }) => {
    const [item, setItem] = useState({
        rowId: rowId,
        qtd: 0,
        produto: {
            id: '',
            name: 'Selecionar...',
        },
        vunit: 0,
        vtotal: 0,
    });

    const contextValue = { item, setItem };

    return (
        <ItemContext.Provider value={contextValue}>
            {children}
        </ItemContext.Provider>
    );
};

export default ItemContext;
