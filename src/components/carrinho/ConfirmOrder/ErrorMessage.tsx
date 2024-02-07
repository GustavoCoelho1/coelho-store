import { Button } from 'components/common/form/utils';
import Modal from 'components/common/ui/Modal';

interface Props {
    modalVisible: boolean;
    setModalVisible: (val: boolean) => void;
    resetForm: () => void;
}

const ErrorMessage: React.FC<Props> = ({
    resetForm,
    setModalVisible,
    modalVisible,
}) => {
    const handleClick = () => {
        resetForm();
        setModalVisible(false);
    };

    return (
        <Modal show={modalVisible} handleClose={setModalVisible}>
            <div className="flex flex-col items-center justify-center">
                <h1 className="mb-3 text-center text-2xl text-violet-900">
                    Houve um erro com seu pedido!
                </h1>
                <span className="mb-5 text-center text-violet-700">
                    Por favor tente novamente mais tarde!
                </span>
                <Button onClick={() => handleClick()} $isColored={true}>
                    OK
                </Button>
            </div>
        </Modal>
    );
};

export default ErrorMessage;
