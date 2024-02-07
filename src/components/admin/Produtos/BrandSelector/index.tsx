import { motion, Variants } from 'framer-motion';

import InputIcon from 'components/common/form/InputIcon';
import { useEffect, useState, useContext } from 'react';
import { CiSearch } from 'react-icons/ci';
import SearchList from './SearchList';

const selectorVariants = {
    show: {
        display: 'flex',
        opacity: 1,
        transition: {
            duration: 0.3,
            delay: 0.3,
        },
    },

    hide: {
        opacity: 0,
        transition: { duration: 0.3 },
        transitionEnd: { display: 'none' },
    },
} as Variants;

export interface iItemProps {
    id: string;
    name: string;
}

interface Props {
    item: iItemProps;
    setItem: (val: iItemProps) => void;
}

const BrandSelector: React.FC<Props> = ({ item, setItem }) => {
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState('');

    return (
        <div
            onClick={() => setVisible(!visible)}
            className="w-full h-full px-4 py-3 flex items-center justify-center border border-l-0 rounded-r-3xl relative cursor-pointer text-violet-500"
        >
            <span
                className={`max-w-full text-ellipsis overflow-hidden whitespace-nowrap ${
                    item.name.includes('...')
                        ? 'text-violet-300'
                        : 'text-violet-400'
                }`}
            >
                {item.name}
            </span>

            <motion.div
                initial={false}
                animate={visible ? 'show' : 'hide'}
                variants={selectorVariants}
                style={{
                    top: '110%',
                    minWidth: '250px',
                }}
                className={`absolute z-10 w-full cursor-default`}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-full p-4 flex flex-col bg-white border border-violet-300 rounded-xl"
                >
                    <div className="w-full mb-3">
                        <InputIcon
                            icon={<CiSearch />}
                            value={search}
                            placeholder={'Pesquisar...'}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="w-full">
                        <SearchList
                            setSelected={setItem}
                            setVisible={setVisible}
                            search={search}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const styles = {
    search: `
        w-full mb-2
        border rounded-2xl border-violet-400 p-2
        focus:outline-none
    `,
};

export default BrandSelector;
