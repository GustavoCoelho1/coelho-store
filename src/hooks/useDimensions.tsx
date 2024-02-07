import { useState, useEffect, isValidElement, useRef } from 'react';

const useDimensions = (element) => {
    const [dimensions, setDimensions] = useState({
        width: element.innerWidth,
        height: element.innerHeight,
    });

    const getSize = () => {
        setDimensions({
            width: element.innerWidth,
            height: element.innerHeight,
        });
    };

    useEffect(() => {
        element.addEventListener('resize', getSize);

        return () => {
            element.removeEventListener('resize', getSize);
        };
    }, [dimensions]);

    return dimensions;
};

export default useDimensions;
