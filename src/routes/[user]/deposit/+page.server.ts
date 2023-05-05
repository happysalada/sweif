import type { PageServerLoad } from './$types';

export const load = (async ({ platform, fetch }) => {
  let api_key = platform?.env?.SERPAPI_KEY;
  if (!api_key) {
    return {
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
  };
}) satisfies PageServerLoad;