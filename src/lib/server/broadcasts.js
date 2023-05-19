import { db } from './db'
import { marked } from 'marked'

export function all() {
  return db.broadcast.findMany()
}

export function find(id) {
  return db.broadcast.findUnique({
    where: { id }
  })
}

export function create(data) {
  return db.broadcast.create({ data })
}

export function update(id, data) {
  return db.broadcast.update({
    where: { id },
    data
  })
}

export function remove(id) {
  return db.broadcast.delete({
    where: { id }
  })
}

export async function send(id) {
  const broadcast = await find(id)
  const subscribers = await db.subscriber.findMany({
    where: { status: 'SUBSCRIBED' },
    select: { id: true }
  })

  await db.$transaction([
    update(id, { sentAt: new Date() }),

    db.message.createMany({
      data: subscribers.map(subscriber => ({
        subject: broadcast.subject,
        content: marked(broadcast.content),
        subscriberId: subscriber.id,
        broadcastId: broadcast.id
      }))
    })
  ])
}
