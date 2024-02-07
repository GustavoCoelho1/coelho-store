import { useContext, useEffect, useState } from 'react';
import { IoMdRemove } from 'react-icons/io';
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

const ButtonRemoveItem = () => {
    const {
        formData,
        formData: { orderTable },
        setFormData,
    } = useContext(AddPedidoContext);
    const [removeEnabled, setRemoveEnabled] = useState(false);

    const handleClick = () => {
        orderTable.mode = 'remove';

        setFormData({ ...formData, orderTable });
    };

    useEffect(() => {
        orderTable.items.length > 1
            ? setRemoveEnabled(true)
            : setRemoveEnabled(false);
    }, [formData]);

    return (
        <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick()}
            initial={false}
            animate={removeEnabled ? 'show' : 'hide'}
            variants={thisVariants}
        >
            <IoMdRemove className="mr-2 text-xl" />
            <span>Remover Item</span>
        </Button>
    );
};

export default ButtonRemoveItem;
