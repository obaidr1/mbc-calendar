export default defineNuxtRouteMiddleware(async (to) => {
  try {
    const { data: user } = await useFetch('/api/auth/user')
    const isAdmin = user.value?.role === 'admin'

    if (!isAdmin && to.path.startsWith('/admin')) {
      return navigateTo('/login')
    }
  } catch (error) {
    console.error('Auth middleware error:', error)
    return navigateTo('/login')
  }
})
