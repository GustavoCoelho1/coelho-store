import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './NavBar';

export default function MainLayout({ children }) {
    return (
        <div className="flex">
            <Navbar />
            <div className="flex w-screen bg-violet-100 pt-[70px]">
                <AnimatePresence mode="wait" initial={false}>
                    {children}
                </AnimatePresence>
            </div>
        </div>
    );
}
