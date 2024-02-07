import { ForwardRefComponent, HTMLMotionProps, motion } from 'framer-motion';
import tw from 'tailwind-styled-components';

interface iFavButtonProps {
    className?: string;
    $clicked?: boolean;
}

export const Container = tw(motion.button)<iFavButtonProps>`
    absolute
    z-20
    top-8
    right-8
    flex
    items-center
    justify-center
    p-8
    border
    border-violet-600
    rounded-full
    transition
    duration-300
    ${(p) =>
        p.$clicked ? 'bg-violet-600 text-white' : 'bg-white text-violet-600'}
    ${(p) => (p.className ? p.className : '')}

    hover:text-white
    hover:bg-violet-600
` as ForwardRefComponent<
    HTMLDivElement,
    HTMLMotionProps<'button'> & iFavButtonProps
>;
