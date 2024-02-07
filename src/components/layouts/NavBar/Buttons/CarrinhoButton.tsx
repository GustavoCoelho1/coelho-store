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
            onClick={() => {
                Router.push(
                    status === 'authenticated' ? '/Carrinho' : '/Login',
                );
                setCarrinhoPreviewVisible(false);
            }}
            onHoverStart={() => setCarrinhoPreviewVisible(true)}
            onHoverEnd={() => setCarrinhoPreviewVisible(false)}
            className={styles.navLink}
        >
            <MdOutlineShoppingCart />
            <span className="text-sm ml-2">Carrinho</span>
            <CarrinhoPreview show={carrinhoPreviewVisible} />
        </motion.li>
    );
};

export default CarrinhoButton;
