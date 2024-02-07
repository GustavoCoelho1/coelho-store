import { Variants } from 'framer-motion';

interface AnimationProps {
    initial: number;
    animate: number;
}

class Animate {
    fadeIn(duration: number, ease: string | number[]): Variants {
        return {
            initial: {
                opacity: 0,
            },

            animate: {
                opacity: 1,
                transition: {
                    duration: duration,
                    ease: ease,
                },
            },
        };
    }

    fadeOut(duration: number, ease: string | number[]): Variants {
        return {
            initial: {
                opacity: 1,
            },

            animate: {
                opacity: 0,
                transition: {
                    duration: duration,
                    ease: ease,
                },
            },
        };
    }

    fadeInStagger(
        duration: number,
        ease: string | number[],
        staggerChildren: number,
    ): Variants {
        return {
            initial: {
                opacity: 0,
            },

            animate: {
                opacity: 1,
                transition: {
                    duration: duration,
                    ease: ease,
                    staggerChildren: staggerChildren,
                },
            },
        };
    }

    fadeInUp(
        duration: number,
        ease: string | number[],
        y: AnimationProps,
    ): Variants {
        return {
            initial: {
                y: y.initial,
                opacity: 0,
            },
            animate: {
                y: y.animate,
                opacity: 1,
                transition: {
                    duration: duration,
                    ease: ease,
                },
            },
        };
    }

    stagger(staggerChildren: number): Variants {
        return {
            animate: {
                transition: {
                    staggerChildren: staggerChildren,
                },
            },
        };
    }
}

const animate = new Animate();

export default animate;
