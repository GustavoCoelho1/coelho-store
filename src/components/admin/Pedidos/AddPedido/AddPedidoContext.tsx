import { createContext, useState, useEffect } from 'react';
import { iItemProps } from './ItensPedido/ItemContext';

export interface AddPedidoData {
    client: {
        id: string;
        name: string;
    };
    data: string;
    orderTable: {
        items: iItemProps[];
        mode: 'default' | 'remove';
        toRemoveItems: iItemProps[];
    };
    total: number;
}

interface AddPedidoContextProps {
    formData: AddPedidoData;
    formSubmited: boolean;
    setFormData: (val: AddPedidoData) => void;
    setFormSubmited: (val: boolean) => void;
}

const AddPedidoContext = createContext({} as AddPedidoContextProps);

export const AddPedidoProvider = ({ children }) => {
    const item = {
        rowId: 0,
        qtd: 0,
        produto: {
            id: '',
            name: 'Selecionar...',
        },
        vunit: 0,
        vtotal: 0,
    };

    const [formData, setFormData] = useState({
        client: {
            id: '',
            name: 'Selecionar...',
        },
        data: new Date().toISOString().slice(0, 10),

        orderTable: {
            items: [item],
            mode: 'default',
            toRemoveItems: [],
        },

        total: 0,
    } as AddPedidoData);

    const [formSubmited, setFormSubmited] = useState(false);

    const contextValue = {
        formData,
        formSubmited,
        setFormData,
        setFormSubmited,
    };

    return (
        <AddPedidoContext.Provider value={contextValue}>
            {children}
        </AddPedidoContext.Provider>
    );
};

export default AddPedidoContext;
