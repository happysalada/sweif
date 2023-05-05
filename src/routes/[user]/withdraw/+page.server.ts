import type { PageServerLoad } from './$types';
import { FiatCurrency, StableCoin } from '$lib/types';
import { decimalToStringTable } from '$lib/utils';
import { EUR_FEE_TABLE } from "$lib/constants";
// import { getJson } from "serpapi";

export const load = (async ({ platform, fetch }) => {
  let api_key = platform?.env?.SERPAPI_KEY;
  if (!api_key) {
    return {
      fxRates: {
        "EURC-EUR": 1.0,
      },
      feeTable: {
        [FiatCurrency.EUR]: decimalToStringTable(EUR_FEE_TABLE),
        [StableCoin.EURC]: decimalToStringTable(EUR_FEE_TABLE),
      }
    }
  }
  let eurCopRateResponse = await fetch(`https://serpapi.com/search?engine=google_finance&q=${"EUR-COP"}&api_key=${api_key}`)
  let eurCopRate = await eurCopRateResponse.json();
  let eurCopRateNumber: number = eurCopRate.summary?.extracted_price;
  let eurUsdRateResponse = await fetch(`https://serpapi.com/search?engine=google_finance&q=${"EUR-COP"}&api_key=${api_key}`)
  let eurUsdRate = await eurUsdRateResponse.json();
  let eurUsdRateNumber: number = eurUsdRate.summary?.extracted_price;
  let usdCopRateResponse = await fetch(`https://serpapi.com/search?engine=google_finance&q=${"EUR-COP"}&api_key=${api_key}`)
  let usdCopRate = await usdCopRateResponse.json();
  let usdCopRateNumber: number = usdCopRate.summary?.extracted_price;
  return {
    fxRates: {
      "EURC-EUR": 1.0,
      "EUR-USDC": eurUsdRateNumber,
      "EUR-USDT": eurUsdRateNumber,
      "EURC-COP": eurCopRateNumber,
      "USDC-COP": usdCopRateNumber,
      "USDT-COP": usdCopRateNumber,
    },
    feeTable: {
      [FiatCurrency.EUR]: decimalToStringTable(EUR_FEE_TABLE),
      [StableCoin.EURC]: decimalToStringTable(EUR_FEE_TABLE),
      [StableCoin.USDC]: decimalToStringTable(EUR_FEE_TABLE),
      [StableCoin.USDT]: decimalToStringTable(EUR_FEE_TABLE),
    }
  };
}) satisfies PageServerLoad;