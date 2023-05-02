import { db } from './db'

export function subscribe(data) {
  return db.subscriber.create({
    data: {
      ...data,
      status: 'PENDING',
      confirmationCode: crypto.randomUUID(),
      unsubscribeCode: crypto.randomUUID(),
    }
  })
}
