import { useContext, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import AddPedidoContext from '../../AddPedidoContext';
import { Button } from 'components/common/form/utils';

const ButtonAddItem = () => {
    const {
        formData,
        formData: { orderTable },
        setFormData,
    } = useContext(AddPedidoContext);

    const handleClick = () => {
        let maxId = 0;

        orderTable.items.forEach(({ rowId }) => {
            maxId = rowId > maxId ? rowId : maxId;
        });

        const newRowId = maxId + 1;

        const item = {
            rowId: newRowId,
            qtd: 0,
            produto: {
                id: '',
                name: '',
            },
            vunit: 0,
            vtotal: 0,
        };

        orderTable.items.push(item);

        setFormData({ ...formData, orderTable });
    };

    return (
        <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick()}
        >
            <IoMdAdd className="mr-2 text-xl" />
            <span>Adicionar Item</span>
        </Button>
    );
};

export default ButtonAddItem;
