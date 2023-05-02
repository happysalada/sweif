import type { PageServerLoad } from './$types';
import { Decimal } from "decimal.js";
import { FiatCurrency } from '$lib/types';
// import { getJson } from "serpapi";

const EUR_TABLE = [
  { min: new Decimal(0), max: new Decimal(199), rate: new Decimal(0.04)},
  { min: new Decimal(200), max: new Decimal(499), rate: new Decimal(0.03)},
  { min: new Decimal(500), max: new Decimal(999), rate: new Decimal(0.025)},
  { min: new Decimal(1000), max: new Decimal(2999), rate: new Decimal(0.021)},
  { min: new Decimal(3000), max: new Decimal(4999), rate: new Decimal(0.018)},
  { min: new Decimal(5000), max: new Decimal(9999), rate: new Decimal(0.015)},
  { min: new Decimal(10000), max: new Decimal(19999), rate: new Decimal(0.013)},
  { min: new Decimal(20000), max: new Decimal(200000000), rate: new Decimal(0.011)}
]

export const load = (async ({ platform, fetch }) => {
  let api_key = platform?.env?.SERPAPI_KEY;
  if (!api_key) {
    return {
      fx: "missing_api_key"
    }
  }
  // let eurCop = await getJson("google_finance", {
  //       api_key, // Get your API_KEY from https://serpapi.com/manage-api-key
  //       q: "EUR-COP",
  //     })
  let eurCopResponse = await fetch(`https://serpapi.com/search?engine=google_finance&q=${"EUR-COP"}&api_key=${api_key}`)
  let eurCop = await eurCopResponse.json();
  let eurCopRate: number = eurCop.summary?.extracted_price;
  let copTable = EUR_TABLE.map(({min, max, rate}) => ({ min: min.div(eurCopRate), max: max.div(eurCopRate), rate}))
  return {
    fxRates: {
      "EUR-COP": eurCopRate,
    },
    feeTable: {
      [FiatCurrency.EUR]: EUR_TABLE,
      [FiatCurrency.COP]: copTable,
    }
  };
}) satisfies PageServerLoad;