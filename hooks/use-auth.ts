"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: "user1",
    name: "John Doe",
    email: "user@example.com",
    password: "password123",
    role: "user",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    purchases: ["1", "3", "5"],
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    phone: "+1 (555) 987-6543",
    address: {
      street: "456 Admin Ave",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "United States",
    },
    purchases: [],
  },
  {
    id: "admin2",
    name: "Thanh Admin",
    email: "thanhfa2k2@gmail.com",
    password: "ktm1803",
    role: "admin",
    phone: "+84 123 456 789",
    address: {
      street: "789 Admin St",
      city: "Ho Chi Minh City",
      state: "",
      zipCode: "70000",
      country: "Vietnam",
    },
    purchases: [],
  },
]

// Types
type Address = {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  phone?: string
  address?: Address
  purchases: string[]
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  adminLogin: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  loginWithFacebook: () => Promise<void>
  logout: () => void
  checkPurchase: (productId: string) => boolean
  updateUserProfile: (updatedUser: Partial<User>) => Promise<void>
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find user with matching credentials
      const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password && u.role === "user")

      if (!foundUser) {
        throw new Error("Invalid email or password")
      }

      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = foundUser

      // Store user in state and localStorage
      setUser(userWithoutPassword as User)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))

      // Also store in a cookie for middleware
      document.cookie = `user=${JSON.stringify(userWithoutPassword)}; path=/; max-age=${60 * 60 * 24 * 7}`
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Admin login function
  const adminLogin = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find admin user with matching credentials
      const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password && u.role === "admin")

      if (!foundUser) {
        throw new Error("Invalid admin credentials")
      }

      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = foundUser

      // Store user in state and localStorage
      setUser(userWithoutPassword as User)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))

      // Also store in a cookie for middleware
      document.cookie = `user=${JSON.stringify(userWithoutPassword)}; path=/; max-age=${60 * 60 * 24 * 7}`
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user already exists
      const existingUser = MOCK_USERS.find((u) => u.email === email)
      if (existingUser) {
        throw new Error("Email already in use")
      }

      // In a real app, you would send this data to your API
      // For this demo, we'll just simulate a successful registration
      console.log("User registered:", { name, email, password })

      // In a real app, you might automatically log the user in after registration
      // or redirect them to the login page
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Social login functions
  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would integrate with Google OAuth
      // For this demo, we'll just simulate a successful login

      const mockGoogleUser = {
        id: "google-user-1",
        name: "Google User",
        email: "google-user@example.com",
        role: "user" as const,
        phone: "+1 (555) 111-2222",
        address: {
          street: "123 Google St",
          city: "Mountain View",
          state: "CA",
          zipCode: "94043",
          country: "United States",
        },
        purchases: ["2", "4"],
      }

      setUser(mockGoogleUser)
      localStorage.setItem("user", JSON.stringify(mockGoogleUser))

      // Also store in a cookie for middleware
      document.cookie = `user=${JSON.stringify(mockGoogleUser)}; path=/; max-age=${60 * 60 * 24 * 7}`
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithFacebook = async () => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would integrate with Facebook OAuth
      // For this demo, we'll just simulate a successful login

      const mockFacebookUser = {
        id: "facebook-user-1",
        name: "Facebook User",
        email: "facebook-user@example.com",
        role: "user" as const,
        phone: "+1 (555) 333-4444",
        address: {
          street: "456 Facebook Ave",
          city: "Menlo Park",
          state: "CA",
          zipCode: "94025",
          country: "United States",
        },
        purchases: ["1", "6"],
      }

      setUser(mockFacebookUser)
      localStorage.setItem("user", JSON.stringify(mockFacebookUser))

      // Also store in a cookie for middleware
      document.cookie = `user=${JSON.stringify(mockFacebookUser)}; path=/; max-age=${60 * 60 * 24 * 7}`
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Update user profile
  const updateUserProfile = async (updatedUser: Partial<User>) => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (!user) {
        throw new Error("No user logged in")
      }

      // Merge current user with updated fields
      const newUserData = { ...user, ...updatedUser }

      // Update user in state and localStorage
      setUser(newUserData)
      localStorage.setItem("user", JSON.stringify(newUserData))

      // Also update in cookie for middleware
      document.cookie = `user=${JSON.stringify(newUserData)}; path=/; max-age=${60 * 60 * 24 * 7}`

      return newUserData
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")

    // Remove cookie
    document.cookie = "user=; path=/; max-age=0"

    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })

    router.push("/")
  }

  // Check if user has purchased a product
  const checkPurchase = (productId: string) => {
    if (!user) return false
    return user.purchases.includes(productId)
  }

  // Compute if user is admin
  const isAdmin = user?.role === "admin"

  // Context value
  const value = {
    user,
    isLoading,
    isAdmin,
    login,
    adminLogin,
    register,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    checkPurchase,
    updateUserProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

