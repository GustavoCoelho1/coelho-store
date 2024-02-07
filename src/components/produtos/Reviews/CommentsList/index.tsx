import { Divider } from 'components/common/form/utils';
import { iProdutoAvaliacao } from 'types/ProdutoAvaliacao';
import Comment from './CommentCard';

interface Props {
    list: iProdutoAvaliacao[];
}

const CommentList: React.FC<Props> = ({ list }) => {
    return (
        <>
            {list.length > 0 ? (
                list.map((avaliacao) => {
                    return (
                        <>
                            <Comment avaliacao={avaliacao} />
                            <Divider $margin="my-6" />
                        </>
                    );
                })
            ) : (
                <span>Este produto ainda não possui avaliações!</span>
            )}
        </>
    );
};

export default CommentList;
