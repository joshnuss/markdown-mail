import { db } from '$lib/server/db'
import { faker } from '@faker-js/faker'

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
