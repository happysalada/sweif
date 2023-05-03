import type { PageServerLoad } from './$types';
import { FiatCurrency } from '$lib/types';
import { decimalToStringTable } from '$lib/utils';
import { EUR_FEE_TABLE } from "$lib/constants";
// import { getJson } from "serpapi";

export const load = (async ({ platform, fetch }) => {
  let api_key = platform?.env?.SERPAPI_KEY;
  if (!api_key) {
    return {
    }
  }
  // let eurCop = await getJson("google_finance", {
  //       api_key, // Get your API_KEY from https://serpapi.com/manage-api-key
  //       q: "EUR-COP",
  //     })
  let eurCopResponse = await fetch(`https://serpapi.com/search?engine=google_finance&q=${"EUR-COP"}&api_key=${api_key}`)
  let eurCop = await eurCopResponse.json();
  let eurCopRate: number = eurCop.summary?.extracted_price;
  let copTable = EUR_FEE_TABLE.map(({ min, max, rate }) => ({ min: min.mul(eurCopRate), max: max.mul(eurCopRate), rate }))
  return {
    fxRates: {
      "EUR-COP": eurCopRate,
    },
    feeTable: {
      [FiatCurrency.EUR]: decimalToStringTable(EUR_FEE_TABLE),
      [FiatCurrency.COP]: decimalToStringTable(copTable),
    }
  };
}) satisfies PageServerLoad;