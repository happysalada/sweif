import Decimal from 'decimal.js';
import { FiatCurrency, StableCoin } from '$lib/types';
import { COP_FEE_TABLE, EUR_FEE_TABLE, USD_FEE_TABLE } from "$lib/constants";
import { decimalToStringTable } from '$lib/utils';

const EUR_COP_FAILOVER = 5000;
const USD_COP_FAILOVER = 4500;
const EUR_USD_FAILOVER = 1.1;
const DEFAULT_FEE_RATE = new Decimal("0.01");

const failover = (from: FiatCurrency, to: FiatCurrency): number => {
  if (from == FiatCurrency.USD && to == FiatCurrency.COP) return USD_COP_FAILOVER;
  if (from == FiatCurrency.EUR && to == FiatCurrency.COP) return EUR_COP_FAILOVER;
  if (from == FiatCurrency.EUR && to == FiatCurrency.USD) return EUR_USD_FAILOVER;
  return 1;
}

const exchangeRate = async (from: FiatCurrency, to: FiatCurrency, fetch: any): Promise<number> => {
  try {
    const response = await fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`);
    const json = await response.json();
    console.log(json)
    if (json.success) {
      return json.rates[to];
    }
    console.log(`exchange rate query failed ${JSON.stringify(json)}`);
    return failover(from, to);
  } catch (e) {
    console.log(e)
    return failover(from, to);
  }
}

export const rates = async (fetch: any): Promise<{ [key: string]: number}> => {

  let eurCopRate = await exchangeRate(FiatCurrency.EUR, FiatCurrency.COP, fetch);
  let eurUsdRate = await exchangeRate(FiatCurrency.EUR, FiatCurrency.USD, fetch);
  let usdCopRate = await exchangeRate(FiatCurrency.USD, FiatCurrency.COP, fetch);

return {
    "EURC-EUR": 1.0,
    "EUR-USDC": eurUsdRate,
    "EUR-USDT": eurUsdRate,
    "EUR-COP": eurCopRate,
    "EURC-COP": eurCopRate,
    "USDC-COP": usdCopRate,
    "USDT-COP": usdCopRate,
  }
}

export const feeRate = (amount: Decimal, currency: Currency): Decimal => {
  let feeTable = undefined
  if (currency == FiatCurrency.EUR || currency == StableCoin.EURC) {
    feeTable = EUR_FEE_TABLE;
  }
  if (currency == FiatCurrency.USD || currency == StableCoin.USDC || currency == StableCoin.USDT) {
    feeTable = USD_FEE_TABLE;
  }
  if (currency == FiatCurrency.COP) {
    feeTable = COP_FEE_TABLE;
  }
  if (feeTable === undefined) return new Decimal(0);
  let feeRange = feeTable.find(
    ({ min, max }) =>
      min.lessThanOrEqualTo(amount) &&
      amount.lessThanOrEqualTo(max)
  );
  return feeRange?.rate ?? DEFAULT_FEE_RATE
}