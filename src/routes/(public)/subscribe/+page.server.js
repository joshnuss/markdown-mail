import { subscribe } from '$lib/server/subscribers'
import { redirect } from '@sveltejs/kit'

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData()

    await subscribe({
      firstName: form.get('firstName'),
      lastName: form.get('lastName'),
      email: form.get('email'),
    })

    throw redirect(303, "/subscribe/complete")
  }
}
