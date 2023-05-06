import { db } from './db'

export function all() {
  return db.subscriber.findMany()
}

export function find(id) {
  return db.subscriber.findUnique({ where: { id }})
}

export function subscribe({ email, firstName, lastName }) {
  return db.subscriber.upsert({
    where: { email },
    create: {
      email,
      firstName,
      lastName,
      status: 'PENDING',
      confirmationCode: crypto.randomUUID(),
      unsubscribeCode: crypto.randomUUID(),
    },
    update: {
      status: 'PENDING',
      confirmationCode: crypto.randomUUID(),
      confirmedAt: null,
      unsubscribeCode: crypto.randomUUID(),
      unsubscribedAt: null,
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
