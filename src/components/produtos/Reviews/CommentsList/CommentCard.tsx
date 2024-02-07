import StartRating from 'components/common/ui/StarRating';
import { UTCtoDate } from 'utils';
import { iProdutoAvaliacao } from 'types/ProdutoAvaliacao';
import { useEffect, useState } from 'react';

interface Props {
    avaliacao: iProdutoAvaliacao;
}

const Comment: React.FC<Props> = ({ avaliacao }) => {
    const [data] = useState(UTCtoDate(avaliacao.avaliacao_data.toString()));

    return (
        <div className="flex w-full flex-col">
            <div className="mb-4 flex w-full justify-between">
                <div className="flex flex-col items-start justify-center text-violet-600">
                    <div className="mb-1 flex items-center">
                        <span className="mr-3 font-bold text-violet-800">
                            {avaliacao.usuario.user_nome}
                        </span>
                        <span className="text-xs text-violet-400">{data}</span>
                    </div>
                    <StartRating
                        size="text-xs"
                        color="text-violet-800"
                        stars={avaliacao.avaliacao_estrelas}
                    />
                </div>
            </div>

            <span className=" text-sm text-violet-900">
                {avaliacao.avaliacao_comentario}
            </span>
        </div>
    );
};

export default Comment;
