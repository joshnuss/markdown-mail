import { db } from './db'

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
