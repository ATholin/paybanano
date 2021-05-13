import { formatDistance } from 'date-fns'
import { useContext } from 'react';

import UserContext from '../contexts/UserContext'
import bananojs from '../lib/bananoJsInstance'
import CurrencyContext from '../contexts/CurrencyContext';


const PaymentHistoryItem = (props) => {
  const { currency } = useContext(UserContext)
  const { bananoToUsd, fiatToUsd } = useContext(CurrencyContext)

  const { transaction } = props
  const date = new Date(transaction.local_timestamp * 1000)

  const bananoParts = bananojs().getBananoPartsFromRaw(transaction.amount)
  const banano = bananoParts.banano

  const fiatAmount = Math.round((parseInt(banano) * bananoToUsd * fiatToUsd + Number.EPSILON) * 100.0) / 100.0

  return (
    <div className="py-5 px-3 border border-1 border-gray-200 bg-white rounded-xl shadow-sm">
      <div className="flex justify-between">
        <p>Received <span title={date.toString()} className="font-medium text-yellow-700">{formatDistance(date, new Date(), { addSuffix: true })}</span></p>
        <p className="font-black text-lg text-gray-800 flex items-center space-x-1">
          <span>{ banano }</span>
          <img src="banano.svg" className="h-4 w-4" alt="banano logo" />
        </p>
      </div>
      <div className="flex justify-between">
        <p>from <a rel="noreferrer" title={transaction.account} target="_blank" className="underline" href={`https://creeper.banano.cc/explorer/account/${transaction.account}/history`}>{transaction.account.substring(0, 12)}...</a></p>
        <p className="text-sm text-gray-700">{fiatAmount} {currency}</p>
      </div>
    </div>
  )
};

export default PaymentHistoryItem;