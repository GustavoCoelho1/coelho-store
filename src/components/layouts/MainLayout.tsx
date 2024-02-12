import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './NavBar';
import Footer from './Footer';

export default function MainLayout({ children }) {
    return (
        <>
            <Navbar />
            <div className="flex w-screen bg-[#101220] pt-[70px]">
                <AnimatePresence mode="wait" initial={false}>
                    {children}
                </AnimatePresence>
            </div>
            <Footer />
        </>
    );
}
