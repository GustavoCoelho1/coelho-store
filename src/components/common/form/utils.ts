import tw from 'tailwind-styled-components';
import InputMask from 'react-input-mask';

import { ForwardRefComponent, HTMLMotionProps, motion } from 'framer-motion';

interface iInputContainerProps {
    $size: number;
    $pr?: boolean;
    $pl?: boolean;
    $mb?: string;
}

interface iInputTextProps {
    $relative?: boolean;
    $shadow?: boolean;
    $center?: boolean;
    $rounded?: boolean;
    $colorOnFill?: boolean;
    $extra?: string;
}

function setInputContainerSize({ $size }: iInputContainerProps) {
    let thisSize = '';

    switch ($size) {
        case 12:
            thisSize = 'w-full';
            break;

        case 11:
            thisSize = 'md:w-11/12';
            break;

        case 10:
            thisSize = 'md:w-5/6';
            break;

        case 9:
            thisSize = 'md:w-3/4';
            break;

        case 8:
            thisSize = 'md:w-4/6';
            break;

        case 7:
            thisSize = 'md:w-7/12';
            break;

        case 6:
            thisSize = 'md:w-1/2';
            break;

        case 5:
            thisSize = 'md:w-5/12';
            break;

        case 4:
            thisSize = 'md:w-1/3';
            break;

        case 3:
            thisSize = 'md:w-1/4';
            break;

        case 2:
            thisSize = 'md:w-1/6';
            break;

        case 1:
            thisSize = 'md:w-1/12';
            break;

        case 0:
            thisSize = 'hidden';
            break;

        default:
            thisSize = 'w-full';
    }

    return thisSize;
}

export const InputContainer = tw(motion.div)<iInputContainerProps>`
  ${(p) => (p.$pr ? 'md:pr-4' : 'pr-0')}
  ${(p) => (p.$pl ? 'md:pl-4' : 'pl-0')}

  w-full
  flex
  items-center
  flex-col
  mb-5

  ${(p) => (p.$mb ? 'md:' + p.$mb : 'md:mb-0')}
  ${(p) => setInputContainerSize(p)}
  
  md:items-start
` as ForwardRefComponent<
    HTMLDivElement,
    HTMLMotionProps<'div'> & iInputContainerProps
>;

export const Label = tw.label`
  mb-2
  font-bold
  text-violet-900
  spin
`;

export const InputText = tw.input<iInputTextProps>`
  ${(p) =>
      p.$shadow
          ? `shadow-sm
      border-violet-100/40
      shadow-violet-200
      focus:shadow-violet-700/20
      placeholder-shown:shadow-violet-200/40`
          : p.$colorOnFill === false
          ? `border-violet-200
          text-violet-500`
          : `border-violet-300
          text-violet-400
          bg-violet-100/40
          placeholder-shown:bg-white
          placeholder-shown:border-violet-200`}

  ${(p) => (p.$relative ? 'relative flex items-center justify-center' : '')}
  ${(p) => (p.$center ? 'text-center' : '')}
  ${(p) => (p.$rounded === false ? 'rounded-0' : 'rounded-3xl')}

  w-full
  text-sm
  tracking-wide
  px-4
  py-3
  border
  
  
  autofill:bg-violet-300
  placeholder:text-violet-300
  focus:outline-none
  selection:bg-violet-800 selection:text-white 

  transition ease-out duration-700

  ${(p) => p.$extra && p.$extra}
`;

export const InputTextMask = tw(InputMask)<iInputTextProps>`
${(p) =>
    p.$shadow
        ? `shadow-sm
    border-violet-100/40
    shadow-violet-200
    focus:shadow-violet-700/20
    placeholder-shown:shadow-violet-200/40`
        : `border-violet-300
    bg-violet-100/40
    placeholder-shown:bg-white
    placeholder-shown:border-violet-200 `}

relative flex items-center justify-center

w-full
text-sm
tracking-wide
px-4
py-3
rounded-3xl
text-violet-400
border

autofill:bg-violet-300
placeholder:text-violet-300
focus:outline-none
selection:bg-violet-800 selection:text-white 

transition ease-out duration-700
`;

interface iDividerProps {
    $size?: string;
    $margin?: string;
}

export const Divider = tw.div<iDividerProps>`
  ${(p) => (p.$size ? p.$size : 'w-3/5')}
  ${(p) => (p.$margin ? p.$margin : 'my-4')}
  h-0.5
  rounded-xl
  self-center
  bg-violet-300/20
`;

interface iButtonProps {
    $isColored?: boolean;
}

export const Button = tw(motion.button)<iButtonProps>`
    w-full    
    max-w-sm
    mx-2
    text-xl
    p-3
    
    flex
    items-center
    justify-center 
    
    text-violet-600
    bg-white
    border
    border-violet-600
    rounded-full
    hover:bg-violet-600
    hover:text-white

    ${(p) => p.$isColored && 'text-white bg-violet-600'}

    transition
    duration-300
` as ForwardRefComponent<
    HTMLDivElement,
    HTMLMotionProps<'button'> & iButtonProps
>;
