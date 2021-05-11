import { createContext } from 'react';

export interface IUserContext {
    address: string;
    currency: string;
    requestAmount: number;
    paymentHistory: Array<any>;

    setCurrency: (currency: string) => void;
    setDepositAddress: (address: string) => void
    setRequestAmount: (amount: number) => void
    setPaymentHistory: (paymentHistory: Array<any>) => void
}

const UserContext = createContext<IUserContext>(null);

export default UserContext;