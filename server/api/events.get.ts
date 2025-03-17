import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  const events = await prisma.event.findMany({
    orderBy: {
      date: 'asc'
    }
  })
  
  return events
}) 