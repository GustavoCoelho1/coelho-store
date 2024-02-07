import ProgressBar from 'components/common/form/ProgressBar';
import { BsStarFill } from 'react-icons/bs';

interface Props {
    percentage: number;
    star: number;
}

const RatingPerStar: React.FC<Props> = ({ percentage, star }) => {
    return (
        <div className="flex items-center justify-center">
            <div className="mr-4 flex h-[6px] w-full">
                <ProgressBar
                    backgroundColor="bg-violet-100"
                    barColor="bg-violet-800"
                    progress={percentage}
                />
            </div>
            <span className="mr-2 text-violet-800">{star}</span>
            <BsStarFill className=" text-violet-800" />
        </div>
    );
};

export default RatingPerStar;
