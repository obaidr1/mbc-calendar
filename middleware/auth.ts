export default defineNuxtRouteMiddleware((to) => {
  const { session } = useAuth()
  
  if (!session.value?.authenticated && to.path.startsWith('/admin')) {
    return navigateTo('/login')
  }
}) 