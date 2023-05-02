import * as subscribers from '$lib/server/subscribers'
import { error, redirect } from '@sveltejs/kit'

export async function GET({ url }) {
  const id = +url.searchParams.get('id')
  const code = url.searchParams.get('code')

  if (await subscribers.unsubscribe(id, code)) {
    throw redirect(303, "/unsubscribe/complete")
  }

  throw error(406)
}
