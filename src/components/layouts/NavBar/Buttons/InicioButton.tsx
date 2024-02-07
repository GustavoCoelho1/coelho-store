import { BiHome } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { styles } from '..';
import Router from 'next/router';

const InicioButton = () => {
    return (
        <motion.li onClick={() => Router.push('/')} className={styles.navLink}>
            <BiHome />
            <span className="text-sm ml-2">Início</span>
        </motion.li>
    );
};

export default InicioButton;
