import { PrismaClient } from '@prisma/client'

export const db = new PrismaClient({
  log: ['query']
}).$extends({
  name: 'paginate',
  model: {
    $allModels: {
      async paginate({ page = 0, size = 20, ...rest} = {}) {
        const [ count, records ] = await Promise.all([
          this.count({...rest}),
          this.findMany({
            ...rest,
            skip: page * size,
            take: size
          })
        ])

        const pages = Math.ceil(count/size)

        return { records, count, page, pages }
      }
    }
  }
})
