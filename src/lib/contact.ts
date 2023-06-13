import type { Action, Request, Platform } from './$types';
import { z } from 'zod';
import { fail, error } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server"
import { adminNotification, endUserNotification, EndUserEmailNotification } from "$lib/notifications"
// import { parsePhoneNumber } from 'awesome-phonenumber'

export const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  // phone: z.string().min(2).refine(phone => parsePhoneNumber(phone).valid),
  phone: z.string().min(6),
  message: z.string(),
})

export const createContact: Action = async ({ request, platform, fetch }: {request: Request, platform: Platform, fetch: any}) => {
  const form = await superValidate(request, contactSchema, {
    id: "contactForm"
  });

  if (!form.valid) {
    return fail(400, { form })
  }

  try {
    await adminNotification({
      topic: platform.env.NTFY_CONTACT_TOPIC,
      title: `New contact request`,
      tags: 'loudspeaker',
      message: `from: ${form.data.firstName} ${form.data.lastName} ${form.data.phone} ${form.data.email}
message: ${form.data.message}`,
      platform,
      fetch
    })
     await endUserNotification({
      apiKey: platform?.env?.ELASTIC_EMAIL_API_KEY || '',
      type: EndUserEmailNotification.ContactForm,
      name: form.data.firstName,
      email: form.data.email,
      fetch,
      options: {name: form.data.firstName},
    })
  } catch (e) {
    console.log(e);
    return error(500, "An error occured, please try again later");
  }
}
