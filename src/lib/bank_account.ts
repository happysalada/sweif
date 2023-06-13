import type { Action, Request, Platform, Cookies } from './$types';
import { z } from 'zod';
import Surreal from "surrealdb.js";
import { fail, redirect, error } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server"
import { databaseInfo } from '$lib/utils';

export const bankAccountSchema = z.object({
  name: z.string().min(1),
  country: z.string().min(2),
  bankId: z.string().min(1),
  currency: z.string().min(3),
  accountNumber: z.string(),
  iban: z.string(),
  identificationType: z.string(),
  identificationNumber: z.string(),
  ownerName: z.string().min(1),
})

export const createBankAccount: Action = async ({ request, platform, cookies }: {request: Request, platform: Platform, cookies: Cookies}) => {
  const form = await superValidate(request, bankAccountSchema, {
    id: "bankAccountForm"
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
    let raw = await db.create("bank_account", {
      user: user_id,
      name: form.data.name,
      bank: form.data.bankId,
      currency: form.data.currency,
      country: form.data.country,
      iban: form.data.iban,
      account_number: form.data.accountNumber,
      identification_type: form.data.identificationType,
      identification_number: form.data.identificationNumber,
      owner_name: form.data.ownerName,
    });
    let id = raw[0].id
    let created = await db.query('SELECT * FROM $id FETCH currency;', {id})
    return { created, form }
  } catch (e) {
    console.log(e);
    return error(500, "An error occured, please try again later");
  }
}
