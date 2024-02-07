import { createContext, useState } from 'react';
import { iCadastroDataProps } from '../types/CadastroData';

interface CadastroContextProps {
    formData: iCadastroDataProps;
    formActive: string;
    formSubmited: boolean;
    setFormData: (data: iCadastroDataProps) => void;
    setFormActive: (props: string) => void;
    setFormSubmited: (props: boolean) => void;
}

const CadastroContext = createContext({} as CadastroContextProps);

export const CadastroProvider = ({ children }) => {
    const [formActive, setFormActive] = useState('usuario');
    const [formData, setFormData] = useState({} as iCadastroDataProps);

    const [formSubmited, setFormSubmited] = useState(false);

    const contextValue = {
        formData,
        formSubmited,
        formActive,
        setFormSubmited,
        setFormData,
        setFormActive,
    };

    return (
        <CadastroContext.Provider value={contextValue}>
            {children}
        </CadastroContext.Provider>
    );
};

export default CadastroContext;
