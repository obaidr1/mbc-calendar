import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (request) => {
  try {
    const id = request.context.params?.id

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Event ID is required'
      })
    }

    const event = await prisma.event.findUnique({
      where: { id }
    })

    if (!event) {
      throw createError({
        statusCode: 404,
        message: 'Event not found'
      })
    }

    return event
  } catch (error: any) {
    console.error('Error fetching event:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch event'
    })
  }
})
