import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params.id)
    const body = await readBody(event)

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: { isFeatured: body.isFeatured }
    })

    return updatedEvent
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Error updating event featured status'
    })
  }
})
