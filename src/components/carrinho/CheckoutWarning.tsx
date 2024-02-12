import Modal from 'components/common/ui/Modal';
import CartContext from 'contexts/CartContext';
import Router from 'next/router';
import { useContext } from 'react';
import { BsExclamationTriangleFill } from 'react-icons/bs';

const CheckoutWarning = () => {
    const { checkoutWarningVisible, setCheckoutWarningVisible, checkoutLink } =
        useContext(CartContext);

    return (
        <Modal
            show={checkoutWarningVisible}
            handleClose={() => {
                setCheckoutWarningVisible(false);
                Router.push(checkoutLink);
            }}
        >
            <div className="flex w-full flex-col gap-5">
                <div className="flex items-center justify-center gap-2 text-lg text-violet-600">
                    <BsExclamationTriangleFill className="text-lg" />
                    <h1>Aviso!</h1>
                </div>
                <div className="flex flex-col items-center gap-5 text-violet-900">
                    <span className="">
                        Você está prestes a ser direcionado para página de
                        pagamento, <b>NÃO</b> preencha as informações com dados
                        verdadeiros!
                    </span>

                    <span>
                        Insira os dados abaixo na próxima tela para simular uma
                        compra:
                    </span>

                    <div className="flex flex-col gap-1">
                        <span className="flex gap-2">
                            <b>• Número do cartão:</b> 4242 4242 4242 4242
                        </span>
                        <span className="flex gap-2">
                            <b>• CVC (Número de segurança):</b> 123
                        </span>
                        <span className="flex gap-2">
                            <b>• Mês de vencimento:</b> (Qualquer um depois da
                            data atual)
                        </span>
                        <span className="flex gap-2">
                            <b>• Nome do titular:</b> (Qualquer um)
                        </span>
                    </div>

                    <button
                        onClick={() => Router.push(checkoutLink)}
                        className="text-md flex w-11/12 max-w-[400px] items-center justify-center gap-4 rounded-full bg-violet-500 px-4 py-4 text-white"
                    >
                        <span>Li e entendi</span>
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default CheckoutWarning;
