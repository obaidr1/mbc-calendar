import { ref } from 'vue'

interface AuthSession {
  authenticated: boolean;
  role?: string;
}

export const useAuth = () => {
  const session = ref<AuthSession | null>(null)
  const isAdmin = ref(false)

  // Initialize session from localStorage
  if (process.client) {
    const storedSession = localStorage.getItem('authSession')
    if (storedSession) {
      session.value = JSON.parse(storedSession)
      isAdmin.value = session.value?.role === 'admin'
    }
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

  const logout = () => {
    session.value = null
    isAdmin.value = false
    if (process.client) {
      localStorage.removeItem('authSession')
    }
  }

  return {
    session,
    isAdmin,
    login,
    logout
  }
}
