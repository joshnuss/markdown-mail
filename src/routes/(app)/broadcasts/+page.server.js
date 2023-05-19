import * as broadcasts from '$lib/server/broadcasts'

export function load() {
  return {
    broadcasts: broadcasts.all()
  }
}
