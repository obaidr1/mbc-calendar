export default defineEventHandler(async (event) => {
  try {
    // Clear the session
    event.context.session = null

    return {
      success: true
    }
  } catch (error: any) {
    console.error('Error logging out:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to logout'
    })
  }
})
