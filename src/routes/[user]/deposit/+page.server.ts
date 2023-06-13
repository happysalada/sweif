import type { PageServerLoad, Actions } from './$types';
import { fail, redirect, error } from "@sveltejs/kit";
import { z } from 'zod';
import { superValidate } from "sveltekit-superforms/server"
import Surreal from "surrealdb.js";

import { databaseInfo } from '$lib/utils';
import { rates } from "$lib/fx";

const schema = z.object({
  inputAmount: z.number().gt(0),
  inputCurrency: z.string().min(3),
  outputAmount: z.number().gt(0),
  outputCurrency: z.string().min(3),
  // length of id including bank:
  bankId: z.string().min(5),
  accountLast4Digits: z.string().min(4),
  fee: z.number(),
  rate: z.number(),
})

export const load = (async ({ platform, fetch }) => {
  const form = await superValidate(schema);
  const { url, database, namespace } = databaseInfo(platform);

  const db = new Surreal(`${url}/rpc`);

  try {
    const fxRates = await rates(fetch);
		await db.use({ns: namespace, db: database});
    let banks =  db.query(`
SELECT *,
      ->currency_country->country->country_bank->bank AS banks
FROM currency
WHERE type = 'FIAT'
FETCH banks;
`);
    return {
      form,
      banks,
      fxRates,
    }
  } catch (e) {
    console.log(e)
    throw redirect(302, "/signin");
  }
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request, platform, cookies }) => {
    const form = await superValidate(request, schema);

    if (!form.valid) {
      return fail(400, { form })
    }

    const { url } = databaseInfo(platform);

    const db = new Surreal(`${url}/rpc`);
    const jwt = cookies.get('jwt');
    const user_id = cookies.get('user_id');
    if (!jwt || !user_id) {
      throw redirect(302, "/signin");
    }

    try {
      // Select a specific namespace / database
      await db.authenticate(jwt);
      let created = await db.create("deposit_request", {
        user: user_id,
        input_amount: form.data.inputAmount,
        input_currency: `currency:${form.data.inputCurrency}`,
        output_amount: form.data.outputAmount,
        output_currency: `currency:${form.data.outputCurrency}`,
        bank: form.data.bankId,
        last_4_digits: form.data.accountLast4Digits,
        fee: form.data.fee,
        rate: form.data.rate
      });
      return { created, form }
    } catch (e) {
      console.log(e);
      return error(500, "An error occured, please try again later");
    }
  }
} satisfies Actions;