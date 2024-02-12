import { motion, Variants } from 'framer-motion';
import React from 'react';
import SearchBar from './SearchBar';
import { MdMenu } from 'react-icons/md';
import { useState, useEffect } from 'react';

import CarrinhoButton from './Buttons/CarrinhoButton';
import UserButton from './Buttons/UserButton';
import InicioButton from './Buttons/InicioButton';

import CarrinhoMobileButton from './MobileButtons/CarrinhoButton';
import UserMobileButton from './MobileButtons/UserButton';
import InicioMobileButton from './MobileButtons/InicioButton';
import { BiArrowBack } from 'react-icons/bi';
import Router from 'next/router';

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

const NavBar: React.FC = () => {
    const [mobileNavVisible, setMobileNavVisible] = useState(false);

    useEffect(() => {
        if (mobileNavVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [mobileNavVisible]);

    return (
        <motion.nav
            exit={{ opacity: 0 }}
            initial={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={styles.navContainer}
        >
            <div className="container flex justify-between">
                <button className="text-white" onClick={() => Router.push('/')}>
                    Coelho Store
                </button>

                {/*<div className="flex w-3/5 sm:w-2/5">
                <SearchBar />
            </div>*/}

                <ul className={styles.navLinksContainer}>
                    <InicioButton />
                    <CarrinhoButton />
                    <UserButton />
                </ul>

                <div
                    className={styles.mobile}
                    onClick={() => setMobileNavVisible(!mobileNavVisible)}
                >
                    <MdMenu className="text-xl text-white" />
                </div>

                <motion.ul
                    initial={false}
                    animate={mobileNavVisible ? 'show' : 'hidden'}
                    className={styles.mobileNavLinksContainer}
                    variants={mobileLinksVariants}
                >
                    <div className={styles.closeMobile}>
                        <motion.button
                            whileHover={{ x: -3, scale: 1.1 }}
                            onClick={() => setMobileNavVisible(false)}
                        >
                            <BiArrowBack className="text-2xl text-white" />
                        </motion.button>
                    </div>

                    <InicioMobileButton />
                    <CarrinhoMobileButton />
                    <UserMobileButton />
                </motion.ul>
            </div>
        </motion.nav>
    );
};

export const styles = {
    navContainer: `
        h-fit p-4
        bg-violet-800 to-transparent
        flex justify-center z-[50]
        fixed top-0 right-0 left-0
    `,

    navLinksContainer: `
        flex hidden sm:flex
    `,

    mobile: `
        flex    
        py-2 px-3 
        border border-white rounded-2xl 
        sm:hidden cursor-pointer
    `,

    mobileNavLinksContainer: `
        w-full h-screen top-0 right-0 bg-violet-900
        flex flex-col items-center fixed z-[50]
    `,

    mobileNavLink: `
        w-full h-1/4 text-2xl
        flex items-center justify-center relative
        text-white 
        cursor-pointer hover:bg-violet-800
        transition ease-out duration-700
    `,

    closeMobile: `
        w-full text-2xl bg-violet-900 text-white flex p-4
    `,

    navLink: `
        py-2 px-3 mx-2 rounded-3xl 
        flex items-center justify-center relative
        text-white border border-white 
        cursor-pointer hover:bg-white hover:text-violet-400
        transition ease-out duration-700
    `,
};

export default NavBar;
