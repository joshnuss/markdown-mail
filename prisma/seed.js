import { db } from '$lib/server/db'
import { faker } from '@faker-js/faker'

if (await db.subscriber.count() == 0) {
  await setup()
}

async function setup() {
  await db.subscriber.createMany({
    data: Array.from({ length: 200 }).map(() => {
      return {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        status: 'SUBSCRIBED',
        confirmationCode: crypto.randomUUID(),
        unsubscribeCode: crypto.randomUUID(),
      }
    })
  })

  const subjects = ['Welcom aboard!', '10 svelte tips']
  const subscribers = await db.subscriber.findMany()

  for (let subject of subjects) {
    const content = faker.lorem.paragraphs(4)

    await db.broadcast.create({
      data: {
        subject,
        content,
        messages: {
          create: subscribers.map(subscriber => ({
            subject,
            content,
            subscriber: {
              connect: {
                id: subscriber.id
              }
            }
          }))
        }
      }
    })
  }
}
