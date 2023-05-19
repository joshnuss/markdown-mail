import { db } from './db'
import * as mail from './mail'

export async function processAll() {
  while( await processOne() );
}

async function processOne() {
  return db.$transaction(async tx => {
    // 1. find the message
    const message = await lockMessage(tx)

    if (!message) return false

    const mark = (data) => {
      return tx.message.update({
        where: { id: message.id },
        data
      })
    }

    return Promise.all([
      // 2. mark the message status=SENDING
      mark({ status: 'SENDING' }),

      // 3. send the email
      mail.deliver({
        to: message.email,
        subject: message.subject,
        html: message.content
      }),

      // 4. mark the message status=SENT, sentAt=now
      mark({ status: 'SENT', sentAt: new Date() })
    ])
  })
}

async function lockMessage(tx) {
  const messages = await tx.$queryRaw`
    SELECT
      "Message".id,
      "Message".status,
      subject,
      content,
      "Subscriber".email
    FROM "Message"
    INNER JOIN "Subscriber"
      ON "Subscriber".id = "Message"."subscriberId"
    WHERE "Message".status = 'QUEUED'
    LIMIT 1
    FOR UPDATE SKIP LOCKED`

  return messages[0]
}
