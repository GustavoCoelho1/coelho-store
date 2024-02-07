import useDimensions from 'hooks/useDimensions';
import Modal from './Modal';
import { motion, Variants } from 'framer-motion';
import { BiArrowBack } from 'react-icons/bi';

const selectorVariants = {
    show: {
        display: 'flex',
        opacity: 1,
        transition: {
            duration: 0.3,
        },
    },

    hide: {
        opacity: 0,
        transition: { duration: 0.3 },
        transitionEnd: { display: 'none' },
    },
} as Variants;

interface Props {
    visible: boolean;
    setVisible: (val: boolean) => void;
    children: any;
}

const SelectorListContainer: React.FC<Props> = ({
    children,
    visible,
    setVisible,
}) => {
    const { width } = useDimensions(window);

    return width > 640 ? (
        <motion.div
            initial={false}
            animate={visible ? 'show' : 'hide'}
            variants={selectorVariants}
            style={{
                top: '110%',
                minWidth: '250px',
            }}
            className={`absolute z-10 w-full cursor-default`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="flex w-full flex-col items-center rounded-xl border border-violet-300 bg-white p-4"
            >
                {children}
            </div>
        </motion.div>
    ) : (
        <Modal show={visible} handleClose={() => setVisible(false)}>
            {children}
        </Modal>
    );
};

export default SelectorListContainer;
