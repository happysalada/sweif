import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from "@sveltejs/kit";
import { z } from 'zod';
import { superValidate } from "sveltekit-superforms/server"
import Surreal from "surrealdb.js";
import { ONE_DAY } from "$lib/constants";

const schema = z.object({
  name: z.string(),
  country: z.string(),
  email: z.string().email(),
  password: z.string(),
  passwordConfirmation: z.string(),
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

    if (!platform || !platform.env) {
      return fail(500, { form, error: "missing env vars" });
    }

    const { PUBLIC_SURREAL_URL, PUBLIC_SURREAL_DATABASE, PUBLIC_SURREAL_NAMESPACE } = platform?.env;

    if (!PUBLIC_SURREAL_URL) {
      return fail(500, { form, error: "missing env vars" });
    }

    const db = new Surreal(`${PUBLIC_SURREAL_URL}/rpc`);

    console.log(form)

    try {
			let jwt = await db.signup({
				NS: PUBLIC_SURREAL_NAMESPACE,
				DB: PUBLIC_SURREAL_DATABASE,
				SC: "end_user",
				name: form.data.name,
				country: form.data.country,
				email: form.data.email,
				password: form.data.password,
			});
      // TODO set secure to true the future
      cookies.set('jwt', jwt, { httpOnly: true, sameSite: 'strict', maxAge: ONE_DAY });
      redirect(302, `/${form.data.email}/dashboard`);
    } catch (e) {
      console.log(e);
      return fail(400, { form, error: "wrong email password combination" });
    }
  }
} satisfies Actions;