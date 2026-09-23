import axios, { AxiosRequestConfig } from 'axios';
import React, { createContext, useEffect, useState } from 'react';

import { getPriceUrl, promoCodeUrl } from './Data/EndPoint';

const PriceContext = createContext({});

const PriceProvider = ({ children }: any) => {
  const [price, setPrice] = useState<number>(0);
  const [priceWithDiscount, setPriceWithDiscount] = useState<number>(0);
  const [promoCode, setPromoCode] = useState<string | null>(null);

  const getPriceFromServer = async () => {
    const axiosConfig: AxiosRequestConfig = {
      method: 'get',
      url: getPriceUrl,
    };
    try {
      const getPrice = await axios(axiosConfig);
      setPrice(Number(getPrice.data));
      setPriceWithDiscount(Number(getPrice.data));
    } catch (error) {
      console.error('getPriceError => ', error);
      setPrice(999);
      setPriceWithDiscount(999);
    }
  };

  const withDiscount = (discount: any) => {
    let calcDiscount = Math.floor((price * (100 - discount)) / 100);
    setPriceWithDiscount(calcDiscount);
  };

  const resetDiscount = () => {
    setPriceWithDiscount(price);
  };

  const withPromoCode = async (promo_code: string) => {
    const axiosConfig: AxiosRequestConfig = {
      method: 'post',
      url: promoCodeUrl,
      data: {
        promo_code: promo_code,
      },
    };
    try {
      const getPromoCodeData = await axios(axiosConfig);
      setPromoCode(getPromoCodeData.data.promo_code);
      return getPromoCodeData.data.discount;
    } catch (error) {
      console.error('withPromoCodeError', error);
    }
  };

  useEffect(() => {
    getPriceFromServer();
    setPromoCode(null);
  }, []);

  return (
    <PriceContext.Provider
      value={{
        price,
        priceWithDiscount,
        getPriceFromServer,
        withDiscount,
        resetDiscount,
        promoCode,
        withPromoCode,
      }}>
      {children}
    </PriceContext.Provider>
  );
};

export { PriceContext, PriceProvider };
