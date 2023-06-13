import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from "@sveltejs/kit";
import { z } from 'zod';
import { superValidate, setError } from "sveltekit-superforms/server"
import Surreal from "surrealdb.js";

import { ONE_DAY } from "$lib/constants";
import { databaseInfo } from "$lib/utils";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const load = (async () => {
  const form = await superValidate(schema);
  return { form }
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request, platform, cookies }) => {
    const form = await superValidate(request, schema);

    if (!form.valid) {
      return fail(400, { form })
    }

    const { url, database, namespace } = databaseInfo(platform);

    const db = new Surreal(`${url}/rpc`);

    try {
      let jwt = await db.signin({
        NS: namespace,
        DB: database,
        SC: "end_user",
        email: form.data.email,
        password: form.data.password,
      });
      // TODO set secure to true the future
      cookies.set('jwt', jwt, { httpOnly: true, sameSite: 'strict', maxAge: ONE_DAY });
      let userResults = await db.query('SELECT * FROM user WHERE email = $email', { email: form.data.email })
      const user: User = userResults[0]?.result?.[0];
      cookies.set('user_id', user.id, { httpOnly: true, sameSite: 'strict', maxAge: ONE_DAY })
    } catch (e) {
      console.log(e);
      setError(form, 'email', "wrong password email combination");
      setError(form, 'password', "wrong password email combination");
      return fail(400, { form });
    }
    throw redirect(302, `/${form.data.email}/dashboard`);
  }
} satisfies Actions;