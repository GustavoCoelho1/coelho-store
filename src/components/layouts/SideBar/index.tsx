import { useSession } from 'next-auth/react';
import {
    BiHomeAlt,
    BiGift,
    BiCategory,
    BiStore,
    BiArrowBack,
} from 'react-icons/bi';
import { RiGroupLine } from 'react-icons/ri';
import { FiShoppingBag } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

import MinimizeButton from './MinimizeButton';
import SideBarButton from './Buttons/SideBarButton';
import Image from 'next/image';

import userImg from '../../../../public/images/devUser.svg';
import { easeIn, easeOut } from 'animations/myAnimations';
import { MdMenu } from 'react-icons/md';
import styles from './sidebar.module.scss';

const navVariants = {
    show: {
        width: '250px',
        transition: {
            ease: easeIn,
            duration: 0.3,
            staggerChildren: 0.2,
        },
    },

    hide: {
        width: '80px',
        transition: {
            ease: 'easeInOut',
            duration: 0.3,
            delay: 0.2,
        },
    },
} as Variants;

const linkVariants = {
    show: {
        display: 'flex',
        opacity: 1,

        transition: {
            ease: easeIn,
            duration: 0.3,
            delay: 0.3,
        },
    },
    hide: {
        opacity: 0,

        transition: {
            ease: easeIn,
            duration: 0.3,
        },

        transitionEnd: {
            display: 'none',
        },
    },
} as Variants;

const mobileLinksVariants = {
    show: {
        left: 0,
        transition: {
            staggerChildren: 0.2,
            bounce: 0,
        },
    },

    hidden: {
        left: '100%',
        transition: {
            bounce: 0,
        },
    },
} as Variants;

const SideBar = () => {
    const { data } = useSession();
    const [isActive, setIsActive] = useState(false);
    const [mobileSideVisible, setMobileSideVisible] = useState(false);

    useEffect(() => {
        if (mobileSideVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [mobileSideVisible]);

    return (
        <motion.aside
            exit={{ opacity: 0 }}
            initial={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={'flex'}
        >
            <motion.div
                initial={false}
                animate={isActive ? 'show' : 'hide'}
                variants={navVariants}
                className={styles.container}
            >
                <div className={styles.minimizeButton}>
                    <MinimizeButton
                        navState={isActive}
                        setNavState={setIsActive}
                    />
                </div>

                <motion.span
                    initial={false}
                    animate={isActive ? 'show' : 'hide'}
                    variants={linkVariants}
                    className={styles.logo}
                >
                    Coelhão Store
                </motion.span>

                <motion.div
                    initial={false}
                    animate={isActive ? 'show' : 'hide'}
                    variants={linkVariants}
                    className={styles.userContainer}
                >
                    <div className={styles.userImg + 'invert filter'}>
                        <Image
                            src={userImg}
                            width="100%"
                            height="100%"
                            layout="responsive"
                        />
                    </div>
                    <span className={styles.userName}>{data.user?.name}</span>
                </motion.div>

                <ul className={styles.sideLinks}>
                    {/* <SideBarButton
                        href="/admin/Dashboard"
                        active={isActive}
                        title="Dashboard"
                        icon={<BiHomeAlt />}
                    /> */}

                    <SideBarButton
                        href="/admin/Pedidos/"
                        active={isActive}
                        title="Pedidos"
                        icon={<FiShoppingBag />}
                    />

                    <SideBarButton
                        href="/admin/Produtos/"
                        active={isActive}
                        title="Produtos"
                        icon={<BiGift />}
                    />

                    <SideBarButton
                        href="/admin/Categorias/"
                        active={isActive}
                        title="Categorias"
                        icon={<BiCategory />}
                    />

                    {/* <SideBarButton
                        href="/admin/Clientes/"
                        active={isActive}
                        title="Clientes"
                        icon={<RiGroupLine />}
                />*/}

                    <SideBarButton
                        href="/admin/Marcas/"
                        active={isActive}
                        title="Marcas"
                        icon={<BiStore />}
                    />
                </ul>
            </motion.div>

            <div
                className={styles.mobile}
                onClick={() => {
                    setMobileSideVisible(true);
                    setIsActive(true);
                }}
            >
                <MdMenu className="text-2xl text-white" />
            </div>

            <motion.ul
                initial={false}
                animate={mobileSideVisible ? 'show' : 'hidden'}
                className={styles.mobileSideLinkContainer}
                variants={mobileLinksVariants}
            >
                <div className={styles.closeMobile}>
                    <motion.button
                        whileHover={{ x: -3, scale: 1.1 }}
                        onClick={() => {
                            setMobileSideVisible(false);
                            setIsActive(false);
                        }}
                    >
                        <BiArrowBack className="text-2xl text-white" />
                    </motion.button>
                </div>

                {/*<SideBarButton
                    href="/admin/Dashboard"
                    active={isActive}
                    title="Dashboard"
                    icon={<BiHomeAlt />}
                    />*/}

                <SideBarButton
                    href="/admin/Pedidos/"
                    active={isActive}
                    title="Pedidos"
                    icon={<FiShoppingBag />}
                />

                <SideBarButton
                    href="/admin/Produtos/"
                    active={isActive}
                    title="Produtos"
                    icon={<BiGift />}
                />

                <SideBarButton
                    href="/admin/Categorias/"
                    active={isActive}
                    title="Categorias"
                    icon={<BiCategory />}
                />

                {/*<SideBarButton
                    href="/admin/Clientes/"
                    active={isActive}
                    title="Clientes"
                    icon={<RiGroupLine />}
                />*/}

                <SideBarButton
                    href="/admin/Marcas/"
                    active={isActive}
                    title="Marcas"
                    icon={<BiStore />}
                />
            </motion.ul>
        </motion.aside>
    );
};

export default SideBar;
