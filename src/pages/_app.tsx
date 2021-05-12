import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import Head from 'next/head'

import UserContext, { IUserContext } from '../contexts/UserContext';
import CurrencyContext, { ICurrencyContext } from '../contexts/CurrencyContext';
import '../styles/globals.css'
import { currencySymbols } from '../helpers/currency';
import verifyAddress from '../helpers/verifyAddress';

interface IState {
  currency: string;
  address: string;
  requestAmount: string;
  bananoToUsd: number;
  fiatToUsd: number;
  paymentHistory: Array<any>;
}

export default class MyApp extends App<any, any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      currency: "USD",
      address: '',
      requestAmount: '',
      bananoToUsd: 0.0,
      fiatToUsd: 0.0,
      paymentHistory: []
    };
  }

  componentDidMount = () => {
    let currency = localStorage.getItem('currency')
    const address = localStorage.getItem('address')

    if (!currencySymbols.includes(currency)) {
      currency = this.state.currency
    }

    if (!address || !verifyAddress(address)) return Router.push('start')

    this.setState({
      currency,
      address,
    })
  };

  setCurrency = (currency) => {
    localStorage.setItem('currency', currency);

    this.setState({ currency })
  };

  setDepositAddress = (address) => {
    localStorage.setItem('address', address);
    this.setState({ address })
  };

  setRequestAmount = (amount) => {
    this.setState({ requestAmount: amount })
  };

  setBananoToUsd = (value) => {
    this.setState({ bananoToUsd: value })
  };

  setFiatToUsd = (value) => {
    this.setState({ fiatToUsd: value })
  };

  setPaymentHistory = (paymentHistory) => {
    this.setState({ paymentHistory })
  };

  getUserContext = (): IUserContext => {
    return {
      currency: this.state.currency,
      address: this.state.address,
      requestAmount: this.state.requestAmount,
      paymentHistory: this.state.paymentHistory,
      setCurrency: this.setCurrency,
      setDepositAddress: this.setDepositAddress,
      setRequestAmount: this.setRequestAmount,
      setPaymentHistory: this.setPaymentHistory
    }
  }

  getCurrencyContext = (): ICurrencyContext => {
    return {
      bananoToUsd: this.state.bananoToUsd,
      fiatToUsd: this.state.fiatToUsd,
      setBananoToUsd: this.setBananoToUsd,
      setFiatToUsd: this.setFiatToUsd,
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <UserContext.Provider value={this.getUserContext()}>
        <CurrencyContext.Provider value={this.getCurrencyContext()}>
          <Head>
            <title>PayBanano</title>
            <meta name="description" content="An easy way to accept payments using the amazing potassium-rich cryptocurrency banano" />
            <link rel="icon" href="favicon.svg" />
            <link rel="mask-icon" href="favicon.svg" color="#000000" />
            <meta name="banano" content={ process.env.NEXT_PUBLIC_DONATION_ADDRESS } />
          </Head>
          <Component {...pageProps} />
        </CurrencyContext.Provider>
      </UserContext.Provider>
    );
  }
}