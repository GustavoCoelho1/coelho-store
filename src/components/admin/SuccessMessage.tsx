import Router from 'next/router';
import { BiCheck } from 'react-icons/bi';
import { Button } from 'components/common/form/utils';

interface Props {
    title: string;
    subtitle: string;
    exitRoute: string;
    resetForm: () => void;
    setModalVisible: (val: any) => void;
}

const SuccessMessage: React.FC<Props> = ({
    title,
    subtitle,
    exitRoute,
    resetForm,
    setModalVisible,
}) => {
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <BiCheck className="text-6xl text-violet-900" />
            <span className="mt-5 mb-8 text-center text-2xl font-bold text-violet-900">
                {title}
            </span>

            <div className="flex w-4/5 flex-col items-center">
                <span className="mb-4 text-center text-lg text-violet-700">
                    {subtitle}
                </span>
                <div className="flex w-full flex-col items-center justify-center">
                    <div className="m-3 w-full">
                        <Button
                            onClick={() => {
                                resetForm();
                                setModalVisible(false);
                            }}
                        >
                            Sim
                        </Button>
                    </div>
                    <div className="my-3 w-full">
                        <Button onClick={() => Router.push(exitRoute)}>
                            Voltar à página inicial
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessMessage;
