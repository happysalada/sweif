import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from "@sveltejs/kit";
import { z } from 'zod';
import { superValidate, setError } from "sveltekit-superforms/server"
import Surreal from "surrealdb.js";
import { parsePhoneNumber } from 'awesome-phonenumber'

import { ONE_DAY } from "$lib/constants";
import { databaseInfo } from '$lib/utils';
import { adminNotification, endUserNotification, EndUserEmailNotification } from "$lib/notifications"

const schema = z.object({
  name: z.string().min(1),
  // id including country:
  country: z.string().min(10),
  phone: z.string().min(2).refine(phone => parsePhoneNumber(phone).valid),
  email: z.string().email(),
  password: z.string().min(5),
  passwordConfirmation: z.string(),
})

export const load = (async ({platform}) => {
  const form = await superValidate(schema);

  const { url, database, namespace } = databaseInfo(platform);

  const db = new Surreal(`${url}/rpc`);
  try {
		await db.use({ns: namespace, db: database});
    let countries =  db.select("country");
    return { form, countries }
  } catch(e) {
    return { form, error: (e as Error).toString() }
  }
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
			let jwt = await db.signup({
				NS: namespace,
				DB: database,
				SC: "end_user",
				name: form.data.name.trim(),
				country: form.data.country,
        phone: form.data.phone,
				email: form.data.email.trim(),
				password: form.data.password,
			});
      // TODO set secure to true the future
      cookies.set('jwt', jwt, { httpOnly: true, sameSite: 'strict', maxAge: ONE_DAY });
      let userResults = await db.query('SELECT * FROM user WHERE email = $email', { email: form.data.email })
      const user: User = userResults[0]?.result?.[0];
      cookies.set('user_id', user.id, { httpOnly: true, sameSite: 'strict', maxAge: ONE_DAY})
      await adminNotification({
        topic: platform?.env?.NTFY_SIGNUP_TOPIC || '',
        title: `New Signup!`,
        tags: 'partying_face,chocolate_bar,rocket',
        message: ` ${form.data.name} ${form.data.phone} ${form.data.email}`,
        platform,
        fetch
      })
     await endUserNotification({
      apiKey: platform?.env?.ELASTIC_EMAIL_API_KEY || '',
      type: EndUserEmailNotification.Signup,
      name: user.name,
      email: user.email,
      fetch,
      options: {},
    })
    } catch (e) {
      console.log(e);
      // assume all authentication errors are a failed email or phone unique constraint validation
      setError(form, 'email', "email is potentially already taken");
      setError(form, 'phone', "phone is potentially already taken");
      return fail(400, { form });
    }
    throw redirect(302, `/${form.data.email}/dashboard`);
  }
} satisfies Actions;