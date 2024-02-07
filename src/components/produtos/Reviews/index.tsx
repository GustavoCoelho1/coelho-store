import { motion } from 'framer-motion';
import { gql, useQuery } from '@apollo/client';
import Modal from 'components/common/ui/Modal';
import { iProduto } from 'types/Produto';
import { BiArrowBack } from 'react-icons/bi';
import StartRating from 'components/common/ui/StarRating';
import RatingPerStar from './RatingPerStar';
import CommentsList from './CommentsList/';
import { Divider } from 'components/common/form/utils';
import { useEffect, useState } from 'react';

const AVALIACOES_PRODUTO = gql`
    query ($id: ID!) {
        AVALIACOES_PRODUTO: produtoAvaliacoesByProdutoId(id: $id) {
            avaliacao_comentario
            avaliacao_estrelas
            avaliacao_data
            usuario {
                user_nome
            }
        }
    }
`;

interface Props {
    produto: iProduto;
    media: number;
    visible: boolean;
    setVisible: (val: boolean) => void;
}

const Reviews = ({ produto, media, visible, setVisible }: Props) => {
    const { data, loading, error } = useQuery(AVALIACOES_PRODUTO, {
        variables: {
            id: produto.prod_cod,
        },
    });

    const [fiveStarPercentage, setFiveStarPercentage] = useState(0);
    const [fourStarPercentage, setFourStarPercentage] = useState(0);
    const [threeStarPercentage, setThreeStarPercentage] = useState(0);
    const [twoStarPercentage, setTwoStarPercentage] = useState(0);
    const [oneStarPercentage, setOneStarPercentage] = useState(0);

    useEffect(() => {
        const totalAvaliacoes = produto.produto_avaliacoes.length;

        let cincoEstrelas = 0;
        let quatroEstrelas = 0;
        let tresEstrelas = 0;
        let duasEstrelas = 0;
        let umaEstrela = 0;

        produto.produto_avaliacoes.forEach((item) => {
            switch (item.avaliacao_estrelas) {
                case 1:
                    umaEstrela++;
                    break;
                case 2:
                    duasEstrelas++;
                    break;
                case 3:
                    tresEstrelas++;
                    break;
                case 4:
                    quatroEstrelas++;
                    break;
                case 5:
                    cincoEstrelas++;
                    break;
            }
        });

        setFiveStarPercentage((cincoEstrelas / totalAvaliacoes) * 100);
        setFourStarPercentage((quatroEstrelas / totalAvaliacoes) * 100);
        setThreeStarPercentage((tresEstrelas / totalAvaliacoes) * 100);
        setTwoStarPercentage((duasEstrelas / totalAvaliacoes) * 100);
        setOneStarPercentage((umaEstrela / totalAvaliacoes) * 100);
    }, []);

    return (
        <Modal show={visible} handleClose={() => setVisible(false)}>
            <motion.div
                whileHover={{ x: -3, scale: 1.1 }}
                onClick={() => setVisible(false)}
                className="absolute left-4 top-4 z-10 cursor-pointer"
            >
                <BiArrowBack className="text-xl text-violet-600" />
            </motion.div>

            <div className="flex w-full flex-col items-center">
                <h1 className="mb-3 text-xl text-violet-600">
                    Opniões do produto
                </h1>
                <div className="flex w-full items-center justify-center">
                    <div className="mr-10 flex w-1/2 flex-col items-center">
                        <h1 className="mb-3 text-4xl text-violet-600">
                            {media.toFixed(1)}
                        </h1>
                        <StartRating
                            color="text-violet-600"
                            size="text-base"
                            stars={media}
                        />
                    </div>

                    <div className="flex w-[250px] flex-col">
                        <RatingPerStar
                            star={5}
                            percentage={fiveStarPercentage}
                        />
                        <RatingPerStar
                            star={4}
                            percentage={fourStarPercentage}
                        />
                        <RatingPerStar
                            star={3}
                            percentage={threeStarPercentage}
                        />
                        <RatingPerStar
                            star={2}
                            percentage={twoStarPercentage}
                        />
                        <RatingPerStar
                            star={1}
                            percentage={oneStarPercentage}
                        />
                    </div>
                </div>

                <Divider $margin="my-6" />

                <div className="flex w-10/12 flex-col">
                    {loading ? (
                        <span>Carregando...</span>
                    ) : error ? (
                        <span>
                            Ocorreu um erro ao buscar as avaliações, tente
                            novamente mais tarde!
                        </span>
                    ) : (
                        <CommentsList list={data.AVALIACOES_PRODUTO} />
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default Reviews;
