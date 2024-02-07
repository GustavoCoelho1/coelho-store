import { useContext, useState } from 'react';
import { IoMdClose, IoMdRemove } from 'react-icons/io';
import AddPedidoContext from '../../AddPedidoContext';
import { Button } from 'components/common/form/utils';

const ButtonCancelRemove = () => {
    const {
        formData,
        formData: { orderTable },
        setFormData,
    } = useContext(AddPedidoContext);
    const [isColored, setIsColored] = useState(true);

    const handleClick = () => {
        orderTable.toRemoveItems = [];
        orderTable.mode = 'default';

        setFormData({ ...formData, orderTable });
    };

    return (
        <Button
            $isColored={isColored}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick()}
        >
            <IoMdClose className="mr-2 text-xl" />
            <span>Cancelar</span>
        </Button>
    );
};

export default ButtonCancelRemove;
