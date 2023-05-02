import * as subscribers from '$lib/server/subscribers'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
  const id = +params.id
  const subscriber = await subscribers.find(id)

  if (!subscriber) throw error(404)

  return {
    subscriber
  }
}
