import * as React from 'react'
import { useCookies } from 'react-cookie'
import { useAuthStore } from '@/store/auth/useAuth'

export interface AuthContext {
  isAuthenticated: boolean
  login: (credentials: { nip: string; password: string }) => Promise<{ 
    success: boolean
    token?: string
    user_data?: any
    error?: string 
  }>
  logout: () => Promise<void>
  user: any | null
  token: string | null
  loading: boolean
  initialized: boolean // Add this to track initialization
}

const AuthContext = React.createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [cookies] = useCookies(['userData', 'authToken'])
  const [user, setUser] = React.useState<any | null>(null)
  const [token, setToken] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [initialized, setInitialized] = React.useState<boolean>(false) // Track initialization
  const isAuthenticated = !!token
  const authStore = useAuthStore()

  // Initialize auth state from cookies
  React.useEffect(() => {
    if (cookies.userData && cookies.authToken && !initialized) {
      try {
        const userData = typeof cookies.userData === 'string' 
          ? JSON.parse(cookies.userData) 
          : cookies.userData
        
        setUser(userData)
        setToken(cookies.authToken)
      } catch (error) {
        console.error('Failed to parse user data:', error)
      }
      setInitialized(true)
    } else if (!cookies.userData || !cookies.authToken) {
      setInitialized(true) // Mark as initialized even if no cookies
    }
  }, [cookies.userData, cookies.authToken, initialized])

  const login = React.useCallback(async (credentials: { nip: string; password: string }) => {
    setLoading(true)
    try {
      const response = await authStore.login({
        nip: credentials.nip,
        password: credentials.password
      })

      if (response.token) {
        const userData = response.user_data || {
          nip: credentials.nip,
          name: `User ${credentials.nip}`
        }

        setUser(userData)
        setToken(response.token)
        return {
          success: true,
          token: response.token,
          user_data: userData
        }
      }
      return {
        success: false,
        error: response.error || 'Authentication failed'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed'
      }
    } finally {
      setLoading(false)
    }
  }, [authStore])

  const logout = React.useCallback(async () => {
    setLoading(true)
    try {
      await authStore.logout()
      setUser(null)
      setToken(null)
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setLoading(false)
    }
  }, [authStore])

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      token, 
      login, 
      logout,
      loading,
      initialized // Expose initialized state
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}