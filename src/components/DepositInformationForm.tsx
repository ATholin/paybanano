import { useContext, useEffect, useState } from "react";
import verifyAddress from "../lib/verifyAddress";
import UserContext from "../contexts/UserContext";

const DepositInformationForm = () => {
  const { address, setDepositAddress } = useContext(UserContext)

  const [error, setError] = useState<string>()
  const [currentAddress, setCurrentAddress] = useState(address)

  useEffect(() => {
    setCurrentAddress(address)
  }, [address])

  const handleSetAddress = (e) => {
    setCurrentAddress(e.target.value)
    setError('')

    if (!verifyAddress(e.target.value)) {
      return setError('Please enter a valid BANANO address.')
    }

    setDepositAddress(e.target.value)
  }

  return (
    <div className="mt-4">
      <span className="block text-sm font-medium text-gray-700">Deposit Address</span>
      <input type="text" name="address" placeholder="Deposit Address" value={currentAddress} onChange={handleSetAddress} className="mt-1 form-input relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" />
      <span className="block mt-1 text-sm text-red-500">{error}</span>
    </div>
  );
};

export default DepositInformationForm;