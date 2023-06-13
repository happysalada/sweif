import type { PageServerLoad, Actions } from './$types';
import { contactSchema, createContact } from '$lib/contact';
import { superValidate } from "sveltekit-superforms/server"

export const load = (async ({ fetch }) => {

  const contactForm = await superValidate(contactSchema, { id: "contactForm" });

  return {
    contactForm
  };
}) satisfies PageServerLoad;

export const actions = {
  createContact,
} satisfies Actions;