import { useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Backdrop from '../Backdrop';
import { easeOut } from 'animations/myAnimations';
import useDimensions from 'hooks/useDimensions';

const thisVariants = {
    show: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: easeOut,
        },
    },
    hide: {
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: easeOut,
        },
    },
} as Variants;

const Modal = ({ show, handleClose, children }) => {
    return (
        <Backdrop show={show} onClick={handleClose}>
            <motion.div
                initial={false}
                animate={show ? 'show' : 'hide'}
                variants={thisVariants}
                className={`relative flex h-full w-full flex-col items-center sm:h-fit sm:w-fit`}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="relative flex w-[90%] flex-col items-center justify-start rounded-3xl bg-white p-8 shadow-md sm:min-w-[350px] sm:max-w-[500px]"
                >
                    {children}
                </div>
            </motion.div>
        </Backdrop>
    );
};

export default Modal;
