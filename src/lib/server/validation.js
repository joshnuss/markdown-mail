import { define } from 'superstruct'
import isEmail from 'is-email'
import { fail } from '@sveltejs/kit'

export const email = define('email', isEmail)

export function validate(schema, handler) {
  return async (event) => {
    const form = await event.request.formData()
    const inputs = Object.fromEntries(form.entries())

    const [err, data] = schema.validate(inputs)

    if (err) {
      return fail(400, {
        inputs,
        errors: err.failures()
      })
    }

    return await handler({ ...event, data })
  }
}
