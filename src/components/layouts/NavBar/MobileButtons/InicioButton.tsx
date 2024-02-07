import { BiHome } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { styles } from '..';
import Router from 'next/router';

const InicioButton = () => {
    return (
        <motion.li
            whileHover={{ scale: 1.05 }}
            onClick={() => Router.push('/')}
            className={styles.mobileNavLink}
        >
            <motion.span className="w-28 flex">
                <BiHome />
                <span className="text-xl ml-3">Início</span>
            </motion.span>
        </motion.li>
    );
};

export default InicioButton;
