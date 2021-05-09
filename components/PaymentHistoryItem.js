import { formatDistance } from 'date-fns'
import { useContext } from 'react';

import UserContext from '../contexts/UserContext'
import bananojs from '../helpers/bananoJsInstance'
import CurrencyContext from './CurrencyContext';


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
            <p>Received <span title={date.toString()} className="font-medium text-yellow-500">{formatDistance(date, new Date(), { addSuffix: true })}</span></p>
            <p className="font-medium text-gray-900">{banano} BAN</p>
          </div>
          <div className="flex justify-between">
            <h3>from <a title={transaction.account} target="_blank" className="underline" href={`https://creeper.banano.cc/explorer/account/${transaction.account}/history`}>{transaction.account.substring(0,12)}...</a></h3>
            <p className="font-medium text-gray-900">{fiatAmount} {currency}</p>
          </div>
      </div>
    )
  };
  
  export default PaymentHistoryItem;