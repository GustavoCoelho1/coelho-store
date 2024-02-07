import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

export const SlickArrowRight: React.FC = () => {
    return (
        <div className="text-xl text-violet-600">
            <IoIosArrowForward />
        </div>
    );
};

export const SlickArrowLeft: React.FC = () => {
    return (
        <div className="text-xl text-violet-600">
            <IoIosArrowBack />
        </div>
    );
};
