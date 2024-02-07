import { motion, Variants } from 'framer-motion';
import Router from 'next/router';
import { easeIn } from 'animations/myAnimations';

interface Props {
    href: string;
    icon: React.ReactNode;
    title: string;
    active: boolean;
    className?: string;
}

const thisVariants = {
    show: {
        display: 'flex',
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.3,
            delay: 0.3,
        },
    },
    hide: {
        opacity: 0,
        x: 60,
        transition: {
            duration: 0.3,
        },
        transitionEnd: {
            display: 'none',
        },
    },
} as Variants;

const SideBarButton: React.FC<Props> = ({
    href,
    icon,
    title,
    active,
    className,
}) => {
    const Icon = () => <div className={styles.icon}>{icon}</div>;

    return (
        <li
            onClick={() => {
                Router.push(href);
            }}
            className={styles.container + className}
        >
            <div className={`${styles.inner} ${active && 'w-fit'}`}>
                <Icon />
                <motion.span
                    initial={false}
                    animate={active ? 'show' : 'hide'}
                    variants={thisVariants}
                    className="ml-3"
                >
                    {title}
                </motion.span>
            </div>
        </li>
    );
};

const styles = {
    container: `
        w-full text-md h-14
        flex
        text-white rounded-xl cursor-pointer
        hover:bg-violet-800
        transition duration-300 ease
    `,

    icon: `
        text-xl
        flex justify-center
    `,

    inner: `
        p-3
        flex items-center
    `,
};
export default SideBarButton;
