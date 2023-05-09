import { page } from '$app/stores'
import { get } from 'svelte/store'

export function formHelper({ defaults = {}} = {}) {
  const { form } = get(page)

  return {
    fields: { ...defaults, ...form?.inputs },
    error(fieldName) {
      if (!form?.errors) return

      return form.errors.find(error => error.key == fieldName)
    }
  }
}
