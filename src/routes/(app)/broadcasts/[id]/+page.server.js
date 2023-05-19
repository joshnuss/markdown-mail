import * as broadcasts from '$lib/server/broadcasts'
import { error, redirect } from '@sveltejs/kit'
import { validate } from '$lib/server/validation'
import { object, string, nonempty } from 'superstruct'

const Form = object({
  subject: nonempty(string()),
  content: nonempty(string()),
})

export async function load({ params }) {
  const id = +params.id
  const broadcast = await broadcasts.find(id)

  if (!broadcast) return error(404)

  return { broadcast }
}

export const actions = {
  update: validate(Form, async ({ params, data }) => {
    const id = +params.id

    await broadcasts.update(id, data)

    throw redirect(303, `/broadcasts`)
  }),

  delete: async ({ params }) => {
    const id = +params.id

    await broadcasts.remove(id)

    throw redirect(303, `/broadcasts`)
  },

  send: async ({ params }) => {
    const id = +params.id

    await broadcasts.send(id)

    throw redirect(303, `/broadcasts`)
  }
}
