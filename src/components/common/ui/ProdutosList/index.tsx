import React, { useState } from 'react';

import ProdutoCard from './ProdutoCard';
import { iProduto } from 'types/Produto';

interface Props {
    data: Array<iProduto>;
}

const ProdutosList: React.FC<Props> = ({ data }) => {
    return (
        <ul className="w-full flex flex-wrap justify-center md:justify-start">
            {data.map((produto, idx) => (
                <ProdutoCard key={idx} produto={produto} />
            ))}
        </ul>
    );
};

export default ProdutosList;
