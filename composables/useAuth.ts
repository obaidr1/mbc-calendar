import { ref } from 'vue'

interface AuthSession {
  authenticated: boolean;
  role?: string;
}

export const useAuth = () => {
  const session = ref<AuthSession | null>(null)
  const isAdmin = ref(false)
  const loading = ref(true)

  // Initialize session from localStorage
  if (process.client) {
    const storedSession = localStorage.getItem('authSession')
    if (storedSession) {
      try {
        session.value = JSON.parse(storedSession)
        isAdmin.value = session.value?.role === 'admin'
      } catch (error) {
        console.error('Error parsing stored session:', error)
        localStorage.removeItem('authSession')
      }
    }
    loading.value = false
  }

  const login = async (password: string) => {
    try {
      const response = await useFetch('/api/auth/login', {
        method: 'POST',
        body: { password }
      })

      if (response.data.value?.success) {
        const newSession = { authenticated: true, role: 'admin' }
        session.value = newSession
        isAdmin.value = true
        if (process.client) {
          localStorage.setItem('authSession', JSON.stringify(newSession))
        }
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = async () => {
    try {
      await useFetch('/api/auth/logout', {
        method: 'POST'
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      session.value = null
      isAdmin.value = false
      if (process.client) {
        localStorage.removeItem('authSession')
      }
    }
  }

  const checkAuth = async () => {
    try {
      const { data: user } = await useFetch('/api/auth/user')
      if (user.value?.role === 'admin') {
        const newSession = { authenticated: true, role: 'admin' }
        session.value = newSession
        isAdmin.value = true
        if (process.client) {
          localStorage.setItem('authSession', JSON.stringify(newSession))
        }
        return true
      }
      return false
    } catch (error) {
      console.error('Auth check error:', error)
      return false
    }
  }

  return {
    session,
    isAdmin,
    loading,
    login,
    logout,
    checkAuth
  }
}
