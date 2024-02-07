import { BsStarFill, BsStar, BsStarHalf } from 'react-icons/bs';

interface Props {
    stars: number;
    size: string;
    color: string;
}

const StartRating: React.FC<Props> = ({ stars, size, color }) => {
    return (
        <div className={`flex ${size} ${color}`}>
            <div className="mr-2 flex items-center ">
                {stars === 0 ? (
                    <BsStar />
                ) : stars > 0 && stars <= 0.5 ? (
                    <BsStarHalf />
                ) : (
                    <BsStarFill />
                )}
            </div>

            <div className="mr-2 flex items-center ">
                {stars <= 1 ? (
                    <BsStar />
                ) : stars > 1 && stars <= 1.5 ? (
                    <BsStarHalf />
                ) : (
                    <BsStarFill />
                )}
            </div>

            <div className="mr-2 flex items-center ">
                {stars <= 2 ? (
                    <BsStar />
                ) : stars > 2 && stars <= 2.5 ? (
                    <BsStarHalf />
                ) : (
                    <BsStarFill />
                )}
            </div>

            <div className="mr-2 flex items-center ">
                {stars <= 3 ? (
                    <BsStar />
                ) : stars > 3 && stars <= 3.5 ? (
                    <BsStarHalf />
                ) : (
                    <BsStarFill />
                )}
            </div>

            <div className="mr-2 flex items-center ">
                {stars <= 4 ? (
                    <BsStar />
                ) : stars > 4 && stars <= 4.5 ? (
                    <BsStarHalf />
                ) : (
                    <BsStarFill />
                )}
            </div>
        </div>
    );
};

export default StartRating;
