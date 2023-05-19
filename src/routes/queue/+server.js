import { processAll } from '$lib/server/jobs'
import { text } from '@sveltejs/kit'

export async function POST() {
  await processAll()

  return text('OK')
}
