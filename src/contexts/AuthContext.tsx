import { createContext, useContext } from "react"

interface UserPayload {
  userId: string
  fullName: string
  phoneNumber: string
  email: string
  role: string
  subscription: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: UserPayload | null
  setUser: (user: UserPayload | null) => void
  role: string | null
  hasMetrics: boolean
  login: (phoneNumber: string, password: string) => Promise<void>
  register: (
    fullName: string,
    phoneNumber: string,
    email: string,
    password: string
  ) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
