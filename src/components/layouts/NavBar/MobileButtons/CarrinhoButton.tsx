import { MdOutlineShoppingCart } from 'react-icons/md';
import CarrinhoPreview from 'components/common/ui/CarrinhoPreview';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { styles } from '..';
import Router from 'next/router';
import { useSession } from 'next-auth/react';

const CarrinhoButton = () => {
    const [carrinhoPreviewVisible, setCarrinhoPreviewVisible] = useState(false);
    const { status } = useSession();

    return (
        <motion.li
            whileHover={{ scale: 1.05 }}
            onClick={() =>
                Router.push(status === 'authenticated' ? '/Carrinho' : '/Login')
            }
            className={styles.mobileNavLink}
        >
            <motion.span className="w-28 flex">
                <MdOutlineShoppingCart />
                <span className="text-xl ml-3">Carrinho</span>
            </motion.span>
        </motion.li>
    );
};

export default CarrinhoButton;
