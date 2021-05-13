import { useContext } from 'react';

import UserContext from '../contexts/UserContext';
import LoadingIndicator from './LoadingIndicator';
import PaymentHistoryItem from './PaymentHistoryItem';

const PaymentHistory = () => {
  const { paymentHistory } = useContext(UserContext);

  return (
    <div>
      <h4 className="my-4 block font-medium text-gray-700">Transactions</h4>

      <div className="space-y-2">
        {
          paymentHistory.length ? (
            paymentHistory.map((transaction, index) => (
              <PaymentHistoryItem key={index} transaction={transaction} />
            ))
          ) : (
            <LoadingIndicator text="Loading transactions..." />
          )
        }
      </div>

    </div>
  )
};

export default PaymentHistory;