import type { PageServerLoad } from './$types';
// import { getJson } from "serpapi";

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
  let copEurRate = eurCopRate ? 1 / eurCopRate: 1.0 ;
  return {
    eurCop,
    fxRates: {
      "EUR-COP": eurCopRate,
      "COP-EUR": copEurRate,
    }
  };
}) satisfies PageServerLoad;