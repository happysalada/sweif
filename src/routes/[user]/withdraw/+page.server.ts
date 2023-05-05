import type { PageServerLoad } from './$types';
import { FiatCurrency, StableCoin } from '$lib/types';
import { decimalToStringTable } from '$lib/utils';
import { EUR_FEE_TABLE } from "$lib/constants";
// import { getJson } from "serpapi";

export const load = (async ({ platform, fetch }) => {
  return {
    fxRates: {
      "EURC-EUR": 1.0,
    },
    feeTable: {
      [FiatCurrency.EUR]: decimalToStringTable(EUR_FEE_TABLE),
      [StableCoin.EURC]: decimalToStringTable(EUR_FEE_TABLE),
    }
  };
}) satisfies PageServerLoad;