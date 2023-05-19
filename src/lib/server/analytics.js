import { db } from '$lib/server/db'
import { startOfToday, endOfToday } from 'date-fns'

export function subscribers() {
  return db.subscriber.count({
    where: { status: 'SUBSCRIBED' }
  })
}

export function subscribersToday() {
  return db.subscriber.count({
    where: {
      status: 'SUBSCRIBED',
      createdAt: {
        gte: startOfToday(),
        lt: endOfToday()
      }
    }
  })
}

export function unsubscribed() {
  return db.subscriber.count({
    where: { status: 'UNSUBSCRIBED' }
  })
}
