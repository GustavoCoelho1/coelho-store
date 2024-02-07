import SideBar from './SideBar';
import { AnimatePresence, motion } from 'framer-motion';

export default function AdminLayout({ children }) {
    return (
        <div className="flex">
            <SideBar />
            <AnimatePresence mode="wait" initial={false}>
                {children}
            </AnimatePresence>
        </div>
    );
}
