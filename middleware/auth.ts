export default defineNuxtRouteMiddleware(async (to) => {
  // Skip auth check for login page
  if (to.path === '/login') {
    return
  }

  try {
    const { data: user } = await useFetch('/api/auth/user')
    const isAdmin = user.value?.role === 'admin'

    // Redirect to login if not admin and trying to access admin routes
    if (!isAdmin && to.path.startsWith('/admin')) {
      return navigateTo('/login')
    }

    // Redirect to events page if admin and trying to access login page
    if (isAdmin && to.path === '/login') {
      return navigateTo('/events')
    }
  } catch (error) {
    console.error('Auth middleware error:', error)
    // Only redirect to login if trying to access admin routes
    if (to.path.startsWith('/admin')) {
      return navigateTo('/login')
    }
  }
})
