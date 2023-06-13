import type { PageServerLoad, Actions } from './$types';
import { fail, redirect, error } from "@sveltejs/kit";
import { z } from 'zod';
import { superValidate } from "sveltekit-superforms/server"
import Surreal from "surrealdb.js";
import { rates } from "$lib/fx";
import { bankAccountSchema, createBankAccount } from '$lib/bank_account';

import { databaseInfo } from '$lib/utils';

const withdrawalRequestSchema = z.object({
  inputAmount: z.number().gt(0),
  inputCurrency: z.string().min(3),
  outputAmount: z.number().gt(0),
  outputCurrency: z.string().min(3),
  bankAccountId: z.string(),
  fee: z.number(),
  rate: z.number(),
})

export const load = (async ({ platform, fetch, cookies }) => {
  const withdrawalRequestForm = await superValidate(withdrawalRequestSchema, { id: "withdrawalRequestForm" });
  const bankAccountForm = await superValidate(bankAccountSchema, { id: "bankAccountForm" });

  const user_id = cookies.get('user_id');
  const jwt = cookies.get('jwt')
  if (!user_id || !jwt) {
    throw redirect(302, "/signin");
  }

  const { url } = databaseInfo(platform);

  try {
    const fxRates = await rates(fetch);
    const db = new Surreal(`${url}/rpc`);
    await db.authenticate(jwt);
    let databaseResults = db.query(`
SELECT * FROM bank_account WHERE user = $user FETCH currency;
SELECT
    *,
    ->country_bank->bank AS banks,
    <-currency_country<-currency AS currencies,
    ->country_identification_type->identification_type as identification_types
FROM country FETCH banks, currencies, identification_types;
`, { user: user_id });

    return {
      withdrawalRequestForm,
      bankAccountForm,
      databaseResults,
      fxRates,
    }
  } catch (e) {
    console.log(e)
    throw redirect(302, "/signin");
  }
}) satisfies PageServerLoad;

export const actions = {
  createWithdrawalRequest: async ({ request, platform, cookies }) => {
    const form = await superValidate(request, withdrawalRequestSchema, {
      id: "withdrawalRequestForm",
    });

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
      let created = await db.create("withdrawal_request", {
        user: user_id,
        input_amount: form.data.inputAmount,
        input_currency: `currency:${form.data.inputCurrency}`,
        output_amount: form.data.outputAmount,
        output_currency: `currency:${form.data.outputCurrency}`,
        bank_account: form.data.bankAccountId,
        fee: form.data.fee,
        rate: form.data.rate
      });
      return { created, form }
    } catch (e) {
      console.log(e);
      return error(500, "an error occured, please try again later");
    }
  },
  createBankAccount,
} satisfies Actions;