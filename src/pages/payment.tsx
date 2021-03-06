import Router from "next/router";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { isAfter, subMinutes } from "date-fns";

import bananojs from "../lib/bananoJsInstance";
import UserContext from "../contexts/UserContext";
import CurrencyContext from "../contexts/CurrencyContext";
import AddressExplorerLink from "../components/AddressExplorerLink";
import verifyAddress from "../lib/verifyAddress";
import LoadingIndicator from "../components/LoadingIndicator";

export default function Payment() {
  const {
    requestAmount,
    address,
    currency,
    paymentHistory,
    setPaymentHistory,
  } = useContext(UserContext);
  const { bananoToUsd, fiatToUsd } = useContext(CurrencyContext);

  const [fromAddress, setFromAddress] = useState<string>();
  const [block, setBlock] = useState<string>();

  useEffect(() => {
    if (Number(requestAmount) < 0 || !address) {
      Router.push("/");
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPaymentHistory();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

  useEffect(() => {
    const transaction = paymentHistory.find((transaction) => {
      const date = new Date(transaction.local_timestamp * 1000);
      return (
        isAfter(date, subMinutes(new Date(), 1)) &&
        transaction.amount == toRaw(bananoFromUsd())
      );
    });

    if (transaction) {
      setFromAddress(transaction.account);
      setBlock(transaction.block);
    }
  }, [paymentHistory]);

  const bananoFromUsd = (): number => {
    if (currency == "BAN") return Number(requestAmount);

    const usdRequestAmount = Number(requestAmount) / fiatToUsd;
    return (
      Math.round(
        (usdRequestAmount / bananoToUsd + Number.EPSILON) * 1000000.0
      ) / 1000000.0
    );
  };

  const toRaw = (amount) => {
    if (amount) return bananojs().getRawStrFromBananoStr(amount.toString());

    return 0;
  };

  return (
    <div className="bg-gray-200 flex justify-center h-screen w-screen pt-10 md:pt-0 md:items-center">
      <div>
        <div className="flex justify-center">
          <div className="bg-white rounded-lg shadow-lg p-10">
            {fromAddress ? (
              <div className="">
                <p className="font-black text-green-500 text-4xl">Success!</p>
                <svg
                  className="checkmark mt-8 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className="checkmark__circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className="checkmark__check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
                <p className="mt-6 text-center text-2xl font-bold text-gray-700">
                  {bananoFromUsd()} BAN
                </p>
                <p className="text-center text-gray-500">
                  {requestAmount} {currency}
                </p>
              </div>
            ) : (
              <div>
                <QRCode
                  renderAs="svg"
                  value={`banano:${address}?amount=${toRaw(bananoFromUsd())}`}
                  size={256}
                  className="block mx-auto"
                />
                <p className="mt-4 text-center text-lg font-black text-gray-800">
                  Scan this to pay
                </p>
                <p className="text-center text-3xl font-black text-gray-800">
                  {bananoFromUsd()} BAN
                </p>
                <p className="text-center font-medium text-gray-600">
                  {requestAmount} {currency}
                </p>
              </div>
            )}
          </div>
        </div>
        {fromAddress ? (
          <div className="mt-6 text-center text-gray-500 truncate">
            <p className="text-green-500 text-lg font-bold">
              Successfully received payment from:
            </p>
            <AddressExplorerLink block={fromAddress} />
          </div>
        ) : (
          <LoadingIndicator text="Waiting for payment..." />
        )}

        <Link href="/">
          <a className="mt-6 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:text-sm">
            Back
          </a>
        </Link>
      </div>
    </div>
  );
}
