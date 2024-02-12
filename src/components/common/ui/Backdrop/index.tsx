import { easeOut } from 'animations/myAnimations';
import { motion, Variants } from 'framer-motion';
import useDimensions from 'hooks/useDimensions';
import { useRef, useState, useEffect } from 'react';

interface Props {
    children: any;
    show: boolean;
    onClick: () => void;
}

const thisVariants = {
    show: {
        display: 'flex',
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: easeOut,
        },
    },
    hide: {
        opacity: 0,
        transition: {
            delay: 0.3,
            duration: 0.3,
            ease: easeOut,
        },
        transitionEnd: {
            display: 'none',
        },
    },
} as Variants;

const Backdrop: React.FC<Props> = ({ show, children, onClick }) => {
    const child = useRef();

    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [show]);

    return (
        <motion.div
            className={`fixed left-0 top-0 z-[999] flex h-screen w-screen cursor-default items-start justify-center overflow-y-scroll bg-black/60 py-4`}
            onClick={onClick}
            initial={false}
            animate={show ? 'show' : 'hide'}
            variants={thisVariants}
        >
            <div className="flex" ref={child}>
                {children}
            </div>
        </motion.div>
    );
};
export default Backdrop;
