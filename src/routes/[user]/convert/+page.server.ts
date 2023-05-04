import type { PageServerLoad } from './$types';

export const load = (async ({ platform, fetch }) => {
  let api_key = platform?.env?.SERPAPI_KEY;
  if (!api_key) {
    return {
    }
  }
  let rateResponse = await fetch(`https://serpapi.com/search?engine=google_finance&q=${"EUR-USD"}&api_key=${api_key}`)
  let rate = await rateResponse.json();
  let rateNumber: number = rate.summary?.extracted_price;
  return {
    fxRates: {
      "EURC-USDC": rateNumber,
      "EURC-USDT": rateNumber,
    },
  };
}) satisfies PageServerLoad;