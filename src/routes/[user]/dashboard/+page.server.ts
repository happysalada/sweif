import type { PageServerLoad } from './$types';
import { redirect } from "@sveltejs/kit";
import Surreal from "surrealdb.js";

import { databaseInfo } from '$lib/utils';

export const load = (async ({ cookies, platform }) => {

  const user_id = cookies.get('user_id');
  const jwt = cookies.get('jwt')
  if (!user_id || !jwt) {
    throw redirect(302, "/signin");
  }

  const { url } = databaseInfo(platform);

  const db = new Surreal(`${url}/rpc`);
  try {
    await db.authenticate(jwt);
    let transactionResults = db.query(`
SELECT *, "deposit_request" as type FROM deposit_request WHERE user = $user FETCH input_currency, output_currency;
SELECT *, "withdrawal_request" as type FROM withdrawal_request WHERE user = $user FETCH input_currency, output_currency;
SELECT *, "transfer_request" as type FROM transfer_request WHERE user = $user FETCH input_currency, output_currency
`, { user: user_id });

    return { transactionResults }
  } catch (e) {
    console.log(e)
    throw redirect(302, "/signin");
  }
}) satisfies PageServerLoad;
