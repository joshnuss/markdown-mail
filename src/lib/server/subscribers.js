import { db } from './db'

const pageSize = 20

export async function search({ text, status, sort, page }) {
  const where = {}

  if (text) {
    where.OR = [
      { email: { contains: text, mode: 'insensitive'}},
      { firstName: { contains: text, mode: 'insensitive'}},
      { lastName: { contains: text, mode: 'insensitive'}},
    ]
  }

  if (status) {
    where.status = status
  }

  const [ count, records ] = await Promise.all([
    db.subscriber.count({ where }),
    db.subscriber.findMany({
      where,
      skip: page * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: sort == 'NEWEST' ? 'desc' : 'asc'
      }
    })
  ])

  const pages = Math.ceil(count/pageSize)

  return { records, count, page, pages }
}

export function find(id) {
  return db.subscriber.findUnique({
    where: { id },
  })
}

export function findMessages(subscriberId) {
  return db.message.findMany({
    where: { subscriberId }
  })
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
