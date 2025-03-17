import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const newEvent = await prisma.event.create({
    data: {
      title: body.title,
      description: body.description,
      date: new Date(body.date),
      location: body.location,
      bannerUrl: body.bannerUrl,
      creatorName: body.creatorName,
      creatorEmail: body.creatorEmail
    }
  })
  
  return newEvent
}) 