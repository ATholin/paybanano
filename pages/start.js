import { useState, useContext, useEffect } from 'react';

import UserContext from '../contexts/UserContext';
import Title from '../components/Title'
import DepositInformationForm from '../components/DepositInformationForm';
import CurrencyInformationForm from '../components/CurrencyInformationForm';
import Router from "next/router";
import StartDisclosure from '../components/StartDisclosure';
import verifyAddress from '../helpers/verifyAddress';
import Footer from '../components/Footer'

const Start = () => {

  const { address, currency } = useContext(UserContext)

  const [error, setError] = useState()

  useEffect(() => {
    setError('')
  }, [currency, address])

  const handleSubmit = (e) => {
    if (!verifyAddress(address) || !currency) {
      return setError('Please enter all fields correctly.')
    }

    Router.push('/')
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-4 md:mx-auto max-w-2xl h-screen flex pt-10 sm:pt-0 sm:items-center">
        <div className="w-full">
          <div>
            <div>
              <Title />
              <StartDisclosure />
            </div>

            <CurrencyInformationForm />
            <DepositInformationForm />
            <button onClick={handleSubmit} className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent px-4 py-3 shadow-md border-yellow-400 bg-yellow-300 text-base font-semibold text-yellow-800 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:text-sm">
              Close
            </button>
            <span className="block text-center mt-1 text-sm text-red-500">{error}</span>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Start;