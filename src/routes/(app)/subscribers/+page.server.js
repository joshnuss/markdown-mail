import * as subscribers from '$lib/server/subscribers'

export async function load() {
  return {
    subscribers: subscribers.all()
  }
}
