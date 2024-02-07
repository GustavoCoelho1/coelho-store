import React, { useContext } from 'react';
import { ThreeDots } from 'react-loader-spinner';

const LoadingPage: React.FC = () => {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-white">
            <ThreeDots
                width="200"
                height="200"
                color="#7c3aed"
                ariaLabel="Loading..."
            />
        </div>
    );
};

export default LoadingPage;
