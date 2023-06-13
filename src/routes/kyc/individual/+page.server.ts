import type { PageServerLoad, Actions } from './$types';
import { fail } from "@sveltejs/kit";
import { z } from 'zod';
import { superValidate } from "sveltekit-superforms/server"
import { KycDocumentType } from '$lib/kyc/types';

const schema = z.object({
  id_type: z.string().default(KycDocumentType.ID_CARD),
  id_number: z.string(),
  pep: z.boolean().default(false),
})

export const load = (async () => {
  const form = await superValidate(schema);
  return { form }
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, schema);

    if (!form.valid) {
      return fail(400, { form })
    }

    try {
      console.log("submitting kyc info")
    } catch (e) {
      console.log(e);
      return fail(400, { form });
    }
  }
} satisfies Actions;