import { useState, useEffect } from 'react';
import { BsTruck } from 'react-icons/bs';
import Options from './Options';

export interface iItemProps {
    id: string;
    name: string;
}

export interface Props {
    item: { id: string; name: string };
    setItem: (val: { id: string; name: string }) => void;
}

const AddressSelector: React.FC<Props> = ({ item, setItem }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div
            onClick={() => setVisible(!visible)}
            className="relative flex w-full cursor-pointer items-center justify-center"
        >
            <div className="mr-2 text-lg text-violet-600">
                <BsTruck />
            </div>
            <span className="mr-3 text-violet-600">Envio:</span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-violet-400">
                {item.name}
            </span>

            <Options
                setSelected={setItem}
                setVisible={setVisible}
                visible={visible}
            />
        </div>
    );
};

export default AddressSelector;
