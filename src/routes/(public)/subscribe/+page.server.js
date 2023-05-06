import { subscribe } from '$lib/server/subscribers'
import { redirect, fail } from '@sveltejs/kit'
import { object, string, nonempty } from 'superstruct'
import { email } from '$lib/server/validation'

const Subscriber = object({
  email,
  firstName: nonempty(string()),
  lastName: nonempty(string()),
})

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData()
    const input = {
      firstName: form.get('firstName'),
      lastName: form.get('lastName'),
      email: form.get('email'),
    }

    const [err, data] = Subscriber.validate(input)

    if (err) {
      return fail(400, {
        ...input,
        errors: err.failures()
      })
    }

    await subscribe(data)

    throw redirect(303, "/subscribe/complete")
  }
}
