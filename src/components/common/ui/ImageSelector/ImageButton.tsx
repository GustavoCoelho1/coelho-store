import { motion, Variants } from 'framer-motion';
import { useState, useContext } from 'react';
import { BiError } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { iImageData } from '.';

const thisVariants = {
    show: {
        display: 'flex',
        opacity: 1,
        zIndex: 1,
    },

    hide: {
        opacity: 0,

        transitionEnd: { zIndex: -1, display: 'none' },
    },
} as Variants;

interface Props {
    image: iImageData;
    list: iImageData[];
    setList: (val: iImageData[]) => void;
}

const ImageButton: React.FC<Props> = ({ image, list, setList }) => {
    const url = image.link ? image.link : URL.createObjectURL(image.file);
    const [isHover, setIsHover] = useState(false);

    const handleRemoveClick = () => {
        if (confirm('Você deseja excluir esta imagem?')) {
            setList(
                list.filter((listImg) => {
                    if (image.link) {
                        return listImg.link !== image.link;
                    }
                    if (image.file) {
                        return listImg.file !== image.file;
                    }
                }),
            );
        }
    };

    return (
        <motion.div
            onHoverStart={() => setIsHover(true)}
            onHoverEnd={() => setIsHover(false)}
            className="relative mx-3 flex items-center justify-center w-24 h-24 rounded-full bg-white border border-violet-600 overflow-hidden shadow-md shadow-violet-200 cursor-pointer"
        >
            <img src={url} className="h-24 object-cover w-full rounded-xl" />
            <motion.div
                initial={false}
                animate={isHover ? 'show' : 'hide'}
                variants={thisVariants}
                className="absolute flex items-center justify-center w-full h-full bg-violet-900/40 text-white text-2xl"
                onClick={() => handleRemoveClick()}
            >
                <IoMdClose />
            </motion.div>
        </motion.div>
    );
};

export default ImageButton;
