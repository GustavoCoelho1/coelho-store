import { BsHeart, BsHeartFill } from 'react-icons/bs';

const Footer = () => {
    return (
        <div className="flex w-screen items-center justify-center gap-2 bg-[#101220] p-2 text-xs text-white">
            <span>Desenvolvido com</span>
            <BsHeartFill className="text-violet-600" />
            <span>por Gustavo Coelho</span>
        </div>
    );
};

export default Footer;
