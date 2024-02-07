import tw from 'tailwind-styled-components';

export const SearchInput = tw.input`
    w-10/12 text-md tracking-wide px-4 py-3 rounded-l-xl
    text-violet-400 placeholder:text-violet-300
    focus:outline-none
    selection:bg-violet-800 selection:text-white 
    transition ease-out duration-700
`;

interface iSearchButtonProps {
    type?: string;
}

export const SearchButton = tw.button<iSearchButtonProps>`
    w-12 h-full text-lg
    flex justify-center items-center relative
    bg-white text-violet-400 hover:text-violet-600 rounded-r-xl 
    transition ease-out duration-700
`;
