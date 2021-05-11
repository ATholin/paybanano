import { createContext } from 'react';

export interface ICurrencyContext {
    bananoToUsd: number;
    fiatToUsd: number;

    setBananoToUsd: (value: number) => void;
    setFiatToUsd: (value: number) => void;
}

const CurrencyContext = createContext<ICurrencyContext>(null);

export default CurrencyContext;