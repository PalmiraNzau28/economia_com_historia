import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { apiRequest } from '../services/api'

export interface User {
  id: number
  name: string
  email: string
  phone?: string | null
  province?: string | null
  institution?: string | null
  course?: string | null
  role: 'visitante' | 'subscrito' | 'admin'
  avatarUrl?: string | null
  isActive?: boolean
  createdAt: string
  lastAccess?: string | null
  isAdmin?: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (
    name: string,
    email: string,
    password: string,
    province?: string,
    institution?: string,
    course?: string,
    phone?: string,
  ) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = 'currentUser'

function normalizeUser(user: any): User {
  return {
    id: Number(user.id),
    name: user.name,
    email: user.email,
    phone: user.phone ?? null,
    province: user.province ?? null,
    institution: user.institution ?? null,
    course: user.course ?? null,
    role: user.role ?? (user.isAdmin ? 'admin' : 'subscrito'),
    avatarUrl: user.avatarUrl ?? null,
    isActive: user.isActive ?? true,
    createdAt: user.createdAt ?? new Date().toISOString(),
    lastAccess: user.lastAccess ?? null,
    isAdmin: Boolean(user.isAdmin ?? user.role === 'admin'),
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY)
    if (savedUser) {
      try {
        setUser(normalizeUser(JSON.parse(savedUser)))
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  const persistUser = (nextUser: User | null) => {
    setUser(nextUser)
    if (nextUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const register: AuthContextType['register'] = async (
    name,
    email,
    password,
    province,
    institution,
    course,
    phone,
  ) => {
    try {
      await apiRequest('/auth/register', {
        method: 'POST',
        json: {
          name,
          email,
          password,
          province,
          institution,
          course,
          telemovel: phone ?? null,
        },
      })
      return true
    } catch (error) {
      console.error('Erro ao registar:', error)
      return false
    }
  }

  const login: AuthContextType['login'] = async (email, password) => {
    try {
      const response = await apiRequest<{ user: any }>('/auth/login', {
        method: 'POST',
        json: { email, password },
      })

      persistUser(normalizeUser(response.user))
      return true
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      return false
    }
  }

  const logout = () => {
    persistUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
