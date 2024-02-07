import { InputContainer, InputText } from 'components/common/form/utils';
import ProductSelector from 'components/admin/Pedidos/ProductSelector';
import { useContext, useEffect, useState } from 'react';
import AddPedidoContext from '../AddPedidoContext';
import ItemContext from '../ItensPedido/ItemContext';
import Checkbox from 'components/common/form/CheckBox';
import { AnimatePresence, motion } from 'framer-motion';

const checkBoxVariants = {
    show: {
        display: 'flex',
        opacity: 1,
        transition: { duration: 0.3 },
    },
    hide: {
        opacity: 0,
        transition: { duration: 0.3 },
        transitionEnd: { display: 'none' },
    },
};

const ItemPedido: React.FC = () => {
    const {
        formData,
        formData: { orderTable },
        setFormData,
    } = useContext(AddPedidoContext);
    const { item, setItem } = useContext(ItemContext);
    const [isChecked, setIsChecked] = useState(false);
    const [isEnabled, setIsEnabled] = useState(true);

    const thisIdx = orderTable.items.findIndex(
        (row) => row.rowId === item.rowId,
    );

    useEffect(() => {
        //Preenchimento automático de valor total
        if (
            item.vunit != 0 &&
            item.qtd != 0 &&
            item.vtotal != item.qtd * item.vunit
        ) {
            setItem({ ...item, vtotal: item.qtd * item.vunit });
        }

        //Preenchimento automático de estado do contexto
        orderTable.items[thisIdx] = item;

        setFormData({ ...formData, orderTable, total: formData.total });
    }, [item]);

    useEffect(() => {
        let newTotal = 0;

        formData.orderTable.items.forEach((row) => {
            newTotal += row.vtotal;
        });

        formData.total = newTotal;

        setFormData({ ...formData, total: formData.total });
    }, [orderTable.items.length, item.vtotal]);

    useEffect(() => {
        const removeIdx =
            orderTable.toRemoveItems.length > 0
                ? orderTable.toRemoveItems.findIndex(
                      (remItem) => remItem.rowId === item.rowId,
                  )
                : -1;

        if (isChecked) {
            if (removeIdx === -1) {
                orderTable.toRemoveItems.push(item);

                setFormData({ ...formData, orderTable });
            }
        } else {
            if (removeIdx !== -1) {
                orderTable.toRemoveItems.splice(removeIdx, 1);

                setFormData({ ...formData, orderTable });
            }
        }
    }, [isChecked]);

    useEffect(() => {
        //Desmarcar checkbox automaticamente
        if (orderTable.mode === 'default') {
            setIsChecked(false);
            setIsEnabled(true);
        }

        //Limitar linhas a serem deletadas automaticamente
        if (orderTable.mode === 'remove') {
            if (
                isChecked === false &&
                orderTable.toRemoveItems.length === orderTable.items.length - 1
            ) {
                setIsEnabled(false);
            } else {
                setIsEnabled(true);
            }
        }
    }, [formData]);

    return (
        <>
            <div className="w-full flex my-1">
                <InputContainer $size={orderTable.mode === 'remove' ? 1 : 0}>
                    <motion.div
                        initial={false}
                        animate={isEnabled ? 'show' : 'hide'}
                        variants={checkBoxVariants}
                        className="w-full h-full flex items-center justify-center"
                    >
                        <Checkbox
                            isChecked={isChecked}
                            setIsChecked={setIsChecked}
                        />
                    </motion.div>
                </InputContainer>

                <InputContainer $size={2}>
                    <InputText
                        $center
                        $rounded={false}
                        $colorOnFill={false}
                        $extra={'rounded-l-3xl border-r-0'}
                        placeholder={'0'}
                        type="number"
                        min={1}
                        value={item.qtd}
                        onChange={(e) =>
                            setItem({ ...item, qtd: parseInt(e.target.value) })
                        }
                    />
                </InputContainer>

                <InputContainer $size={orderTable.mode === 'default' ? 6 : 5}>
                    <ProductSelector />
                </InputContainer>

                <InputContainer $size={2}>
                    <InputText
                        $center
                        $rounded={false}
                        $colorOnFill={false}
                        $extra={'border-l-0'}
                        type={'number'}
                        placeholder={'0,00'}
                        value={item.vunit.toFixed(2)}
                        readOnly
                    />
                </InputContainer>

                <InputContainer $size={2}>
                    <InputText
                        $center
                        $rounded={false}
                        $colorOnFill={false}
                        $extra={'rounded-r-3xl border-l-0'}
                        type={'number'}
                        placeholder={'0,00'}
                        value={item.vtotal.toFixed(2)}
                        readOnly
                    />
                </InputContainer>
            </div>
        </>
    );
};

export default ItemPedido;
