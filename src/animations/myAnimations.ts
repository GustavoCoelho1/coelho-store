import animate from '.';

export const easeIn = [0.6, -0.05, 0.001, 0.99];
export const easeOut = [0, 0, 0.2, 1];

export const myFadeIn = animate.fadeIn(2, easeOut);
export const myFadeInUp = animate.fadeInUp(0.6, easeIn, {
    initial: 60,
    animate: 0,
});
export const myFadeOut = animate.fadeOut(1, easeOut);
