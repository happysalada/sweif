import type { PageServerLoad } from './$types';
import { fail, redirect } from "@sveltejs/kit";
import Surreal from "surrealdb.js";

import { databaseInfo } from '$lib/utils';

export const load = (async ({ cookies, platform }) => {

  const user_id: string | undefined = cookies.get('user_id');
  const jwt: string | undefined = cookies.get('jwt')
  if (!user_id || !jwt) {
    throw redirect(302, "/signin");
  }

  const { url } = databaseInfo(platform);

  const db = new Surreal(`${url}/rpc`);
  try {
    await db.authenticate(jwt);
    let databaseResults =  db.query(`
SELECT * FROM user WHERE id = $user;
SELECT deposit_request, created_at FROM deposit WHERE user = $user FETCH deposit_request, deposit_request.input_currency, deposit_request.output_currency;
SELECT withdrawal_request, created_at FROM withdrawal  WHERE user = $user FETCH withdrawal_request, withdrawal_request.input_currency, withdrawal_request.output_currency;
`, { user: user_id });
    return { databaseResults }
  } catch (e) {
    console.log(e)
    throw redirect(302, "/signin");
  }
}) satisfies PageServerLoad;
