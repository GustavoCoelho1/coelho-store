import { motion } from 'framer-motion';
import { BiChevronRight } from 'react-icons/bi';
import styles from '../sidebar.module.scss';

interface Props {
    navState: boolean;
    setNavState: (val: boolean) => void;
}

const MinimizeButton: React.FC<Props> = ({ navState, setNavState }) => {
    return (
        <motion.div
            whileTap={{ opacity: 0.4, scale: 0.95 }}
            className={styles.minimizeContainer}
            onClick={() => setNavState(!navState)}
        >
            <BiChevronRight className={`${navState && ' rotate-180'}`} />
        </motion.div>
    );
};

export default MinimizeButton;
