import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // Get the session from the request
    const session = event.context.session

    if (!session?.authenticated) {
      throw createError({
        statusCode: 401,
        message: 'Not authenticated'
      })
    }

    // Return the user role
    return {
      role: 'admin' // Since we only have admin users for now
    }
  } catch (error: any) {
    console.error('Error getting user:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to get user'
    })
  }
})
