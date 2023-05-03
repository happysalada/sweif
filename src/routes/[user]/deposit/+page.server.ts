import type { PageServerLoad } from './$types';

export const load = (async ({ platform, fetch }) => {
  let api_key = platform?.env?.SERPAPI_KEY;
  if (!api_key) {
    return {
    }
  }
  let eurCopResponse = await fetch(`https://serpapi.com/search?engine=google_finance&q=${"EUR-COP"}&api_key=${api_key}`)
  let eurCop = await eurCopResponse.json();
  let eurCopRate: number = eurCop.summary?.extracted_price;
  return {
    fxRates: {
      "EUR-COP": eurCopRate,
    },
  };
}) satisfies PageServerLoad;