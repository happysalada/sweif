import type { PageServerLoad, Actions } from './$types';
import { fail, redirect, error } from "@sveltejs/kit";
import { z } from 'zod';
import { superValidate } from "sveltekit-superforms/server"
import Surreal from "surrealdb.js";
import { rates } from "$lib/fx";
import { bankAccountSchema, createBankAccount } from '$lib/bank_account';

import { databaseInfo } from '$lib/utils';
import { adminNotification, endUserNotification, EndUserEmailNotification } from "$lib/notifications"

const transferRequestSchema = z.object({
  inputAmount: z.number().gt(0),
  inputCurrency: z.string().min(3),
  outputAmount: z.number().gt(0),
  outputCurrency: z.string().min(3),
  bankAccountId: z.string(),
  bankId: z.string().min(1),
  accountLast4Digits: z.string().min(4),
  fee: z.number(),
  rate: z.number(),
})

export const load = (async ({ platform, fetch, cookies }) => {
  const transferRequestForm = await superValidate(transferRequestSchema, { id: "transferRequestForm" });
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
SELECT
    *,
    ->currency_country->country->country_bank->bank AS banks
FROM currency
WHERE type = 'FIAT'
FETCH banks;
`, { user: user_id });

    return {
      transferRequestForm,
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
  createTransferRequest: async ({ request, platform, cookies }) => {
    const form = await superValidate(request, transferRequestSchema, {
      id: "transferRequestForm",
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
      let created = await db.create("transfer_request", {
        user: user_id,
        input_amount: form.data.inputAmount,
        input_currency: `currency:${form.data.inputCurrency}`,
        output_amount: form.data.outputAmount,
        output_currency: `currency:${form.data.outputCurrency}`,
        from_bank: form.data.bankId,
        from_last_4_digits: form.data.accountLast4Digits,
        to_bank_account: form.data.bankAccountId,
        fee: form.data.fee,
        rate: form.data.rate
      });
      await adminNotification({
        topic: platform?.env?.NTFY_TRANSFER_TOPIC || '',
        title: `New transfer request!`,
        tags: 'tada,money_mouth_face,champagne',
        message: ` ${form.data.inputCurrency} ${form.data.inputAmount}`,
        platform,
        fetch
      })
      let user: User = await db.select(user_id);
      await endUserNotification({
        apiKey: platform?.env?.ELASTIC_EMAIL_API_KEY || '',
        type: EndUserEmailNotification.TransferRequest,
        name: user.name,
        email: user.email,
        fetch,
        options: {
          name: user.name,
          input_currency: form.data.inputCurrency,
          input_amount: form.data.inputAmount,
          rate: form.data.rate,
          output_currency: form.data.outputCurrency,
          output_amount: form.data.outputAmount
        },
      })
      return { created, form }
    } catch (e) {
      console.log(e);
      return error(500, "An error occured, please try again later");
    }
  },
  createBankAccount,
} satisfies Actions;