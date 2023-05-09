import { subscribe } from '$lib/server/subscribers'
import { redirect } from '@sveltejs/kit'
import { object, string, nonempty } from 'superstruct'
import { email, validate } from '$lib/server/validation'

const Subscriber = object({
  email,
  firstName: nonempty(string()),
  lastName: nonempty(string()),
})

export const actions = {
  default: validate(Subscriber, async (data) => {
    await subscribe(data)

    throw redirect(303, "/subscribe/complete")
  })
}
