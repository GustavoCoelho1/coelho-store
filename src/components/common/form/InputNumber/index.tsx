import { InputText } from '../utils';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface iInputNumberProps {
    value: number;
    max: number;
    buttons?: boolean;
    setValue?: (val: number) => void;
}

const InputNumber = ({ value, max, setValue, buttons }: iInputNumberProps) => {
    const handleMenosClick = () => {
        if (value > 1) {
            return setValue(value - 1);
        }
    };

    const handleMaisClick = () => {
        if (value < max) {
            return setValue(value + 1);
        }
    };

    const handleChange = (e) => {
        if (e.target.value > 1 && e.target.value <= max) {
            return setValue(e.target.value);
        } else {
            return setValue(1);
        }
    };

    return (
        <div className="flex justify-center items-center relative w-full">
            <motion.button
                whileTap={{ scale: 1.2, transition: { duration: 0.3 } }}
                onClick={() => handleMenosClick()}
                className="px-3 py-1 flex items-center rounded-xl bg-violet-800 text-white"
            >
                -
            </motion.button>
            <InputText
                style={{ minWidth: '60px' }}
                type="number"
                placeholder="1"
                $center
                value={value}
                onChange={(e) => handleChange(e)}
                $extra={'mx-2'}
            />
            <motion.button
                whileTap={{ scale: 1.2, transition: { duration: 0.3 } }}
                onClick={() => handleMaisClick()}
                className="px-3 py-1 flex items-center rounded-xl bg-violet-800 text-white"
            >
                +
            </motion.button>
        </div>
    );
};

export default InputNumber;
