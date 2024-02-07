import { InputContainer } from 'components/common/form/utils';
import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import ItemPedido from './Item';
import { ItemProvider } from './ItemContext';
import AddPedidoContext from '../AddPedidoContext';
import ButtonAddItem from './Buttons/ButtonAddItem';
import ButtonRemoveItem from './Buttons/ButtonRemoveItem';
import ButtonCancelRemove from './Buttons/ButtonCancelDelete';
import ButtonConfirmRemove from './Buttons/ButtonConfirmDelete';

const buttonsVariants = {
    show: {
        display: 'flex',
        opacity: 1,
        transition: {
            duration: 0.3,
            delay: 0.3,
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

const ItensPedido = () => {
    const {
        formData: { orderTable },
    } = useContext(AddPedidoContext);

    return (
        <div className="w-full self-start flex flex-col items-center sm:mt-2">
            <div className="flex w-full">
                <InputContainer
                    $size={orderTable.mode === 'remove' ? 1 : 0}
                ></InputContainer>

                <InputContainer $size={2}>
                    <span className={styles.headerText}>Qtd.</span>
                </InputContainer>

                <InputContainer $size={orderTable.mode === 'default' ? 6 : 5}>
                    <span className={styles.headerText}>Produto</span>
                </InputContainer>

                <InputContainer $size={2}>
                    <span className={styles.headerText}>V. Unit.</span>
                </InputContainer>

                <InputContainer $size={2}>
                    <span className={styles.headerText}>V. Total</span>
                </InputContainer>
            </div>

            <div className="w-full flex flex-col">
                <div
                    style={{ maxHeight: '250px' }}
                    className={`flex flex-col w-full mb-4 ${
                        orderTable.items.length > 3 && 'overflow-y-scroll'
                    }`}
                >
                    {orderTable.items.map((item, idx) => (
                        <ItemProvider rowId={item.rowId} key={item.rowId}>
                            <ItemPedido />
                        </ItemProvider>
                    ))}
                </div>
                <motion.div
                    initial={false}
                    animate={orderTable.mode === 'default' ? 'show' : 'hide'}
                    variants={buttonsVariants}
                    className="flex items-center justify-center"
                >
                    <ButtonAddItem />
                    <ButtonRemoveItem />
                </motion.div>
                <motion.div
                    initial={false}
                    animate={orderTable.mode === 'remove' ? 'show' : 'hide'}
                    variants={buttonsVariants}
                    className="flex items-center justify-center"
                >
                    <ButtonCancelRemove />
                    <ButtonConfirmRemove />
                </motion.div>
            </div>
        </div>
    );
};

const styles = {
    headerText: `
        self-center text-violet-900 text-center mb-1
    `,
};

export default ItensPedido;
