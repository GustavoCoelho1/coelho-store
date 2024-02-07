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
    const { height: winHeight } = useDimensions(window);

    const child = useRef();
    const [childHeight, setChildHeight] = useState(0);

    const childListener = child?.current as any;

    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [show]);

    useEffect(() => {
        setChildHeight(childListener?.clientHeight);
    }, [childListener?.clientHeight]);

    return (
        <motion.div
            className={`fixed top-0 left-0 z-50 flex h-screen w-screen cursor-default justify-center bg-black/60 ${
                childHeight > winHeight
                    ? 'items-start overflow-y-scroll py-4'
                    : 'items-center'
            }`}
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
