import { useContext } from 'react';

import UserContext from '../contexts/UserContext';

const DepositAccountInformation = () => {
    const { address } = useContext(UserContext);

    return (
      <div>
        <a href="/start" className="block text-right mr-4 mb-2 underline">Edit</a>
        <h3 className="block prose truncate max-w-none bg-yellow-300 rounded-lg shadow-sm border-2 border-black px-4 py-2">Payments are sent to <a target="_blank" href={`https://creeper.banano.cc/explorer/account/${address}/history`}>{address}</a></h3>
      </div>
    )
  };
  
  export default DepositAccountInformation;