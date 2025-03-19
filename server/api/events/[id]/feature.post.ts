import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (request) => {
  try {
    const id = request.context.params?.id
    const body = await readBody(request)
    const { isFeatured } = body

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Event ID is required'
      })
    }

    const event = await prisma.event.update({
      where: { id },
      data: { isFeatured }
    })

    return event
  } catch (error: any) {
    console.error('Error updating event:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to update event'
    })
  }
})
