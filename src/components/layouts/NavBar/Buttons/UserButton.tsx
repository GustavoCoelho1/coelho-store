import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { BiUser } from 'react-icons/bi';
import { styles } from '..';

const UserButton = () => {
    const { data: session } = useSession();

    return (
        <motion.li
            onClick={() => Router.push('/Usuario')}
            className={styles.navLink}
        >
            <BiUser />
            <span className="ml-2 text-sm">
                {session ? session.user.name : 'Login'}
            </span>
        </motion.li>
    );
};

export default UserButton;
