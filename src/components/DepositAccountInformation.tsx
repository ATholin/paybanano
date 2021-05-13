import { useContext } from 'react';
import Link from 'next/link'

import UserContext from '../contexts/UserContext';

const DepositAccountInformation = () => {
  const { address } = useContext(UserContext);

  return (
    <div>
      <div className="w-full flex justify-end">
        <Link href="/start">
          <a className="block text-right mr-4 mb-2 underline">Edit</a>
        </Link>
      </div>
      <p className="block prose truncate max-w-none bg-yellow-300 rounded-lg shadow-sm border-2 border-black px-4 py-2">Payments are sent to <a target="_blank" rel="noreferrer" href={`https://creeper.banano.cc/explorer/account/${address}/history`}>{address}</a></p>
    </div>
  )
};

export default DepositAccountInformation;