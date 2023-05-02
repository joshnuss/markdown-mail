import { db } from './db'

export function all() {
  return db.subscriber.findMany()
}

export function find(id) {
  return db.subscriber.findUnique({ where: { id }})
}

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
