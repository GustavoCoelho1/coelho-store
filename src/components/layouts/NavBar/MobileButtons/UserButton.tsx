import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { BiUser } from 'react-icons/bi';
import { styles } from '..';

const UserButton = () => {
    const { data: session } = useSession();

    return (
        <motion.li
            whileHover={{ scale: 1.05 }}
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={styles.mobileNavLink}
        >
            <motion.span className="w-28 flex">
                <BiUser />
                <span className="text-xl ml-3">
                    {session ? session.user.name : 'Perfil'}
                </span>
            </motion.span>
        </motion.li>
    );
};

export default UserButton;
