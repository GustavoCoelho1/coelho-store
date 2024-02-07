import { BsTruck } from 'react-icons/bs';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useContext, useState } from 'react';
import CartContext from 'contexts/CartContext';
import { BiListCheck } from 'react-icons/bi';
import AddressSelector from '../AddressSelector';
import CheckoutButton from './CheckoutButton';
import ErrorMessage from './ErrorMessage';

export const ConfirmOrder = () => {
    const { cartTotal, address, setAddress } = useContext(CartContext);
    const [errorVisible, setErrorVisible] = useState(false);

    return (
        <>
            <div className="mr-6 hidden w-1/3 items-center rounded-3xl bg-white p-8 pt-6 shadow-lg shadow-violet-500/25 md:flex-row lg:flex">
                <div className="flex w-full flex-col items-center">
                    <span className="bold flex items-center text-violet-600">
                        <BiListCheck className="text-3xl" />
                    </span>
                    <div className="my-4 h-0.5 w-full rounded-xl bg-violet-100" />

                    <AddressSelector item={address} setItem={setAddress} />

                    <div className="my-4 h-0.5 w-full rounded-xl bg-violet-100" />

                    <div className="flex w-full flex-col">
                        <div className="mb-4 flex w-full justify-between">
                            <h2 className="text-lg text-violet-900">
                                Total da Compra:
                            </h2>
                            <h1 className="text-lg text-violet-800">
                                R$ {cartTotal.toFixed(2)}
                            </h1>
                        </div>

                        <CheckoutButton />
                    </div>
                </div>
            </div>
        </>
    );
};

export const ConfirmOrderMobile = () => {
    const { cartTotal, address, setAddress } = useContext(CartContext);

    return (
        <div className="fixed bottom-0 left-0 z-10 flex w-full flex-col items-center bg-white py-4 px-6 shadow-md shadow-violet-800 lg:hidden">
            <AddressSelector item={address} setItem={setAddress} />

            <div className="my-4 h-0.5 w-full rounded-xl bg-violet-100" />

            <div className="mb-4 flex w-full justify-between">
                <h2 className="text-lg text-violet-900">Total da Compra:</h2>
                <h1 className="text-lg text-violet-800">
                    R$ {cartTotal.toFixed(2)}
                </h1>
            </div>

            <CheckoutButton />
        </div>
    );
};
