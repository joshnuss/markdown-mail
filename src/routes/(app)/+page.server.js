import * as analytics from '$lib/server/analytics'

export async function load() {
  return {
    count: {
      total: await analytics.subscribers(),
      today: await analytics.subscribersToday(),
      unsubscribes: await analytics.unsubscribed(),
    },
    dates: await analytics.byDate()
  }
}
