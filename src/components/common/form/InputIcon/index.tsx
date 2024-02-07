import { UseFormRegister } from 'react-hook-form';
import { InputText } from '../utils';

interface Props {
    value?: string;
    required?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    icon: React.ReactNode;
    placeholder: string;
    register?: UseFormRegister<any>;
    name?: string;
    type?: string;
    extra?: string;
}

const InputIcon: React.FC<Props> = ({
    value,
    onChange,
    icon,
    placeholder,
    register,
    name,
    type,
    required,
    extra,
}) => {
    const Icon = () => <div>{icon}</div>;
    const thisRegister = register ? register(name) : null;

    return (
        <div className={`w-full flex justify-center`}>
            <div className="bg-white flex text-xl items-center justify-center pl-4 pr-3 rounded-l-3xl border border-r-0 text-violet-500 border-violet-300">
                <Icon />
            </div>
            <InputText
                {...thisRegister}
                $rounded={false}
                $extra={`rounded-r-3xl placeholder-shown:border-l-violet-300 ${extra}`}
                type={type ? type : 'text'}
                placeholder={placeholder}
                value={value ? value : undefined}
                onChange={onChange ? onChange : undefined}
                required={required ? true : false}
            />
        </div>
    );
};

export default InputIcon;
