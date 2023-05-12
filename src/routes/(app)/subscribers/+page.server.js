import * as subscribers from '$lib/server/subscribers'

export async function load({ url }) {
  const text = url.searchParams.get('search')
  const status = url.searchParams.get('status')
  const sort = url.searchParams.get('sort') || 'newset'
  const page = +(url.searchParams.get('page') || 1)

  return {
    search: {
      text,
      status,
      sort
    },
    subscribers: subscribers.search({ status, text, sort, page })
  }
}
