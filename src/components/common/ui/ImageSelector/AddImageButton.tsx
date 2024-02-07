import React, { useContext, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { SelectorProps } from '.';

const thisVariants = {
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

const AddImageButton: React.FC<SelectorProps> = ({ list, setList }) => {
    const [isActive, setIsActive] = useState(true);
    const inputFile = useRef<HTMLInputElement>();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files[0]) {
            const isImgInList =
                list.filter((img) => img?.file?.name === e.target.files[0].name)
                    .length > 0;

            if (!isImgInList) {
                setList([...list, { file: e.target.files[0] }]);
                inputFile.current.value = null;
            } else {
                toast.error('A imagem escolhida já foi adicionada!');
            }
        }
    };

    useEffect(() => {
        if (list.length >= 5) {
            setIsActive(false);
        } else {
            setIsActive(true);
        }
    }, [list.length]);

    return (
        <motion.div
            initial={false}
            animate={isActive ? 'show' : 'hide'}
            variants={thisVariants}
            className={`text-3xl text-violet-600 flex items-center justify-center w-24 min-w-max h-24 my-4 rounded-full bg-white border-2 border-dashed border-violet-600 overflow-hidden shadow-md shadow-violet-200`}
        >
            <label
                htmlFor="img"
                className="p-10 cursor-pointer origin-center text-center"
            >
                +
            </label>
            <input
                onChange={(e) => handleFileChange(e)}
                ref={inputFile}
                id="img"
                type="file"
                className="hidden"
            />
        </motion.div>
    );
};

export default AddImageButton;
