import { useContext, useState, useEffect } from 'react';
import Link from 'next/link'

import DepositAccountInformation from '../components/DepositAccountInformation';
import PaymentHistory from '../components/PaymentHistory';
import Title from '../components/Title'

import UserContext from '../contexts/UserContext';
import Router from 'next/router';
import CurrencyContext from '../components/CurrencyContext';
import bananojs from '../helpers/bananoJsInstance'
import verifyAddress from '../helpers/verifyAddress';

export default function Home() {
  const { address, currency, requestAmount, setRequestAmount, setPaymentHistory } = useContext(UserContext);
  const { bananoToUsd, setBananoToUsd, fiatToUsd, setFiatToUsd } = useContext(CurrencyContext);

  useEffect(() => {
    fetchPaymentHistory()
  }, [address])

  useEffect(() => {
    updateCurrencyRates()
  }, [currency]);



  const updateCurrencyRates = () => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=BANANO&vs_currencies=USD').then(r => r.json()).then((data) => {
      setBananoToUsd(data.banano.usd)
    })

    fetch(`https://api.exchangerate.host/latest?base=USD&symbols=${currency}`).then(r => r.json()).then((data) => {
      setFiatToUsd(data.rates[currency])
    })
  }

  const fetchPaymentHistory = () => {
    if (address && verifyAddress(address)) {
      bananojs().getAccountHistory(address, 20).then(data => {
        if (data.history) {
          setPaymentHistory(data.history.filter(transaction => transaction.type == 'receive'))
        }
      })
    }
  }

  const handleRequestPayment = (e) => {
    e.preventDefault()

    if (requestAmount > 0.0) {
      Router.push('/payment')
    }
  }

  return (
    <div className="mt-10 mx-4 md:mx-0">
      <div className="max-w-2xl mx-auto pb-56">
        <Title />
        <DepositAccountInformation />
        <PaymentHistory bananoToUsd={bananoToUsd} fiatToUsd={fiatToUsd} />
      </div>
      <form onSubmit={handleRequestPayment} className="bg-yellow-400 px-16 py-8 mt-6 fixed bottom-0 right-0 left-0 h-48">
        <div className="mt-1 max-w-2xl mx-auto flex rounded-md shadow-sm">
          <Link href="/start">
            <a className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 text-sm">
              {currency}
            </a>
          </Link>
          <input
            value={requestAmount}
            onChange={(e) => setRequestAmount(e.target.value)}
            type="number"
            name="amount"
            className="focus:ring-yellow-500 bg-yellow-50 focus:border-yellow-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
            placeholder="Amount"
          />
        </div>
        <div className="sm:max-w-2xl mx-auto">
          <button className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent px-4 py-3 shadow-md border-yellow-700 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:text-sm">
            Request payment
          </button>
        </div>
      </form>
    </div>
  )
}
