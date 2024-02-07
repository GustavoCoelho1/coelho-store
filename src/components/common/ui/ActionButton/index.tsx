const ActionButton = ({ icon, title }) => {
    const Icon = () => <span>{icon}</span>;

    return (
        <div className="flex flex-col items-center">
            <button className="w-20 h-20 mb-3 text-3xl flex items-center justify-center bg-violet-600 text-white rounded-full shadow-md shadow-violet-400 sm:w-24 sm:h-24">
                <Icon />
            </button>
            <span className="text-violet-600 sm:text-lg">{title}</span>
        </div>
    );
};

export default ActionButton;
