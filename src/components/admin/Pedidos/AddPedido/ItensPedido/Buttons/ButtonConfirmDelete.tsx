import { useContext, useEffect, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import AddPedidoContext from '../../AddPedidoContext';
import { Button } from 'components/common/form/utils';

const thisVariants = {
    show: {
        display: 'flex',
        opacity: 1,
        transition: {
            duration: 0.3,
        },
    },
    hide: {
        opacity: 0,
        transition: {
            duration: 0.3,
        },
        transitionEnd: { display: 'none' },
    },
};

const ButtonConfirmRemove = () => {
    const {
        formData,
        formData: { orderTable },
        setFormData,
    } = useContext(AddPedidoContext);
    const [isColored, setIsColored] = useState(true);
    const [isEnabled, setIsEnabled] = useState(false);

    const handleClick = () => {
        orderTable.toRemoveItems.forEach((remItem) => {
            const itemIdx = orderTable.items.findIndex(
                (tableItem) => tableItem.rowId === remItem.rowId,
            );

            orderTable.items.splice(itemIdx, 1);
        });

        orderTable.toRemoveItems = [];

        orderTable.mode = 'default';

        setFormData({ ...formData, orderTable });
    };

    useEffect(() => {
        orderTable.toRemoveItems.length > 0
            ? setIsEnabled(true)
            : setIsEnabled(false);
    }, [formData]);

    return (
        <Button
            $isColored={isColored}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick()}
            initial={false}
            animate={isEnabled ? 'show' : 'hide'}
            variants={thisVariants}
        >
            <BiCheck className="mr-2 text-xl" />
            <span>Confirmar</span>
        </Button>
    );
};

export default ButtonConfirmRemove;
