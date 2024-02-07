import { useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { motion, Variants } from 'framer-motion';

interface iCheckBoxProps {
    isChecked: boolean;
    setIsChecked?: (value: boolean) => void;
    label?: string;
}

const Checkbox = ({ isChecked, setIsChecked, label }: iCheckBoxProps) => {
    return (
        <div
            className={`flex items-center p-1.5 rounded-full w-fit border cursor-pointer transition ease-out duration-300 ${
                isChecked
                    ? 'bg-violet-600 text-white border-violet-600'
                    : 'bg-white border-violet-400 text-violet-300'
            }`}
            onClick={() =>
                setIsChecked ? setIsChecked(!isChecked) : undefined
            }
        >
            <div className="text-sm flex items-center">
                <BsCheckLg />
            </div>
            {label}
        </div>
    );
};

export default Checkbox;
