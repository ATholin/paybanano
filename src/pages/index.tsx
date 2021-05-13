import { useContext, useEffect, useRef } from "react";

import DepositAccountInformation from "../components/DepositAccountInformation";
import PaymentHistory from "../components/PaymentHistory";
import Title from "../components/Title";

import UserContext from "../contexts/UserContext";
import CurrencyContext from "../contexts/CurrencyContext";
import bananojs from "../lib/bananoJsInstance";
import verifyAddress from "../lib/verifyAddress";
import RequestPaymentSlide from "../components/RequestPaymentSlide";
import { fetchBananoUsdRate, fetchFiatUsdRato } from "../lib/fetchRates";


export default function Home() {
  const {
    address,
    currency,
    setPaymentHistory,
  } = useContext(UserContext);
  const { setBananoToUsd, setFiatToUsd } =
    useContext(CurrencyContext);

  const requestPaymentSlide = useRef(null)

  useEffect(() => {
    fetchPaymentHistory();
  }, [address]);

  useEffect(() => {
    updateCurrencyRates();
  }, [currency]);

  const updateCurrencyRates = () => {
    fetchBananoUsdRate().then(setBananoToUsd)
    fetchFiatUsdRato(currency).then(setFiatToUsd)
  };

  const fetchPaymentHistory = () => {
    if (address && verifyAddress(address)) {
      bananojs()
        .getAccountHistory(address, 20)
        .then((data) => {
          if (data.history) {
            setPaymentHistory(
              data.history.filter(
                (transaction) => transaction.type == "receive"
              )
            );
          }
        });
    }
  };

  return (
    <div className="pt-10 mx-4 md:mx-0">
      <div className="max-w-2xl mx-auto pb-32">
        <Title />
        <DepositAccountInformation />
        <PaymentHistory />
        <RequestPaymentSlide ref={requestPaymentSlide} />
      </div>
      <div className="fixed bottom-0 right-0 left-0 w-full md:max-w-sm px-4 md:mx-auto">
        <button onClick={requestPaymentSlide?.current?.setOpen} className="mb-10 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-lg px-4 py-3 bg-white text-base font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm">
          Request Payment
        </button>
      </div>
    </div>
  );
}
