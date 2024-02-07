interface Props {
    children: any;
    width: string;
}

const Card: React.FC<Props> = ({ children, width }) => {
    const w = 'sm:' + width;

    return (
        <div
            className={`relative w-full min-h-screen p-8 bg-white flex flex-col  justify-center items-center shadow-lg shadow-violet-500/25 sm:rounded-3xl md:flex-row sm:w-10/12`}
        >
            {children}
        </div>
    );
};

export default Card;
