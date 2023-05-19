import * as subscribers from '$lib/server/subscribers'
import { error, redirect } from '@sveltejs/kit'

export const actions = {
  delete: async ({ params }) => {
    const id = +params.id

    await subscribers.remove(id)

    throw redirect(303, "/subscribers")
  }
}

export async function load({ params }) {
  const id = +params.id
  const subscriber = await subscribers.find(id)

  if (!subscriber) throw error(404)

  return {
    subscriber,
    stream: {
      messages: subscribers.findMessages(id)
    }
  }
}
