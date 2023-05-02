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

export async function unsubscribe(id, code) {
  const user = await find(id)

  if (!user || user.unsubscribeCode != code) {
    return false
  }

  return db.subscriber.update({
    where: { id },
    data: {
      status: 'UNSUBSCRIBED',
      unsubscribedAt: new Date()
    }
  })
}

export function remove(id) {
  return db.subscriber.delete({
    where: { id }
  })
}
