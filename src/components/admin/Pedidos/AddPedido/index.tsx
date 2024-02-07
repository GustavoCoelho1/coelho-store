import { gql } from '@apollo/client';
import { InputContainer, InputText, Label } from 'components/common/form/utils';
import InputIcon from 'components/common/form/InputIcon';
import { useContext } from 'react';
import { CiCalendarDate, CiUser } from 'react-icons/ci';
import ClientSelector from '../ClientSelector';
import AddPedidoContext from './AddPedidoContext';
import ButtonSubmit from './ButtonSubmit';
import ItensPedido from './ItensPedido';
import { Button } from 'components/common/form/utils';

interface Props {
    setModalContent: (val: JSX.Element) => void;
    setModalVisible: (val: boolean) => void;
}

const AddPedidoForm: React.FC<Props> = ({
    setModalContent,
    setModalVisible,
}) => {
    const { formData, setFormData } = useContext(AddPedidoContext);

    const resetForm = () => {
        const item = {
            rowId: 0,
            qtd: 0,
            produto: {
                id: '',
                name: 'Selecionar...',
            },
            vunit: 0,
            vtotal: 0,
        };

        setFormData({
            client: {
                id: '',
                name: 'Selecionar...',
            },
            data: new Date().toISOString().slice(0, 10),

            orderTable: {
                items: [item],
                mode: 'default',
                toRemoveItems: [],
            },

            total: 0,
        });
    };

    return (
        <div className="mt-6 flex w-full flex-col items-center">
            <div
                style={{ maxWidth: '600px' }}
                className="flex max-w-full flex-col sm:max-w-2xl md:flex-row"
            >
                <InputContainer $size={6} $pr={true}>
                    <div className="flex h-full w-full">
                        <div className="flex items-center rounded-l-3xl border border-violet-300 pl-4 pr-3 text-xl text-violet-500">
                            <CiUser />
                        </div>
                        <ClientSelector />
                    </div>
                </InputContainer>

                <InputContainer $size={6}>
                    <InputIcon
                        icon={<CiCalendarDate />}
                        placeholder={'11/12/2022'}
                        type={'date'}
                        required
                        value={formData.data}
                        onChange={(e) => {
                            formData.data = e.target.value;
                        }}
                    />
                </InputContainer>
            </div>
            <div
                className={
                    'my-8 h-0.5 w-3/5 self-center rounded-xl bg-violet-300/20'
                }
            />
            <div className="flex w-full">
                <ItensPedido />
            </div>
            <div
                className={
                    'my-8 h-0.5 w-3/5 self-center rounded-xl bg-violet-300/20'
                }
            />
            <div className="flex w-52 flex-col items-center justify-center">
                <span className="mb-4 text-center text-xl font-bold text-violet-900">
                    Total Pedido
                </span>
                <InputText
                    $center
                    readOnly
                    required
                    value={'R$ ' + formData.total.toFixed(2)}
                />
            </div>
            <div
                className={
                    'my-8 h-0.5 w-3/5 self-center rounded-xl bg-violet-300/20'
                }
            />

            <ButtonSubmit
                resetForm={resetForm}
                setModalContent={setModalContent}
                setModalVisible={setModalVisible}
            />
        </div>
    );
};

export default AddPedidoForm;
