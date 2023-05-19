import * as broadcasts from '$lib/server/broadcasts'
import { redirect } from '@sveltejs/kit'
import { validate } from '$lib/server/validation'
import { object, string, nonempty } from 'superstruct'

const Form = object({
  subject: nonempty(string()),
  content: nonempty(string()),
})

export const actions = {
  default: validate(Form, async ({ data }) => {
    const broadcast = await broadcasts.create(data)

    throw redirect(303, `/broadcasts/${broadcast.id}`)
  })
}
