import { ref } from 'vue'

interface AuthSession {
  authenticated: boolean;
}

export const useAuth = () => {
  const session = ref<AuthSession | null>(null)
  
  // Initialize session from localStorage
  if (process.client) {
    const storedSession = localStorage.getItem('authSession')
    if (storedSession) {
      session.value = JSON.parse(storedSession)
    }
  }
  
  const login = async (password: string) => {
    try {
      const response = await useFetch('/api/auth/login', {
        method: 'POST',
        body: { password }
      })
      
      if (response.data.value?.success) {
        const newSession = { authenticated: true }
        session.value = newSession
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
    if (process.client) {
      localStorage.removeItem('authSession')
    }
  }
  
  return {
    session,
    login,
    logout
  }
} 