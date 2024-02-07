interface Props {
    barColor: string;
    backgroundColor: string;
    progress: number;
}

const ProgressBar: React.FC<Props> = ({
    progress,
    barColor,
    backgroundColor,
}) => {
    return (
        <div className={`h-full w-full rounded-full ${backgroundColor}`}>
            <div
                style={{ width: `${progress}%` }}
                className={`${barColor} h-full rounded-full `}
            ></div>
        </div>
    );
};

export default ProgressBar;
