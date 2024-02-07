import { FiClock } from 'react-icons/fi';

interface Props {
    icon: React.ReactNode;
    title: string;
    size?: {
        title?: string;
        icon?: string;
    };
    color?: string;
}

const IconTitle: React.FC<Props> = ({ icon, title, size, color }) => {
    const Icon = () => (
        <div className={`text-xl mr-3 ${size?.icon ? size.icon : 'text-xl'} `}>
            {icon}
        </div>
    );

    return (
        <span
            className={`mb-4 flex items-center justify-center ${
                color ? color : 'text-violet-900'
            }`}
        >
            <Icon />
            <span className={size?.title ? size.title : 'text-lg'}>
                {title}
            </span>
        </span>
    );
};

export default IconTitle;
