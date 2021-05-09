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
    <div className="max-w-2xl mx-4 md:mx-auto h-screen flex mt-10 sm:mt-0 sm:items-center">
      <div className="w-full">
        <div>
          <div>
            <Title />
            <StartDisclosure />
          </div>

          <CurrencyInformationForm />
          <DepositInformationForm />
          <button onClick={handleSubmit} className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent px-4 py-3 shadow-md border-yellow-700 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:text-sm">
            Close
          </button>
          <span className="block text-center mt-1 text-sm text-red-500">{error}</span>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Start;