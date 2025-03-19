import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params?.id || '')

    await prisma.event.delete({
      where: { id }
    })

    return { success: true }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Error deleting event'
    })
  }
})
