"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isAdmin: boolean
  isCreator: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: { name: string; email: string; password: string; role: string }) => Promise<{
    success: boolean
    error?: string
  }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true)
        // Check for token in both localStorage and cookies for consistency
        const token = localStorage.getItem("accessToken")

        if (token) {
          // In a real app, you would validate the token with your backend
          const userData = localStorage.getItem("user")
          if (userData) {
            setUser(JSON.parse(userData))
          }
        }
      } catch (error) {
        console.error("Auth check error:", error)
        // Clear potentially corrupted auth data
        localStorage.removeItem("accessToken")
        localStorage.removeItem("user")
        setUser(null)
      } finally {
        // Add a small delay to ensure state updates are processed
        setTimeout(() => {
          setIsLoading(false)
        }, 100)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call to your backend
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        return {
          success: false,
          error: data.message || "Invalid email or password",
        }
      }

      // Store auth data in localStorage
      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("user", JSON.stringify(data.user))

      // Set user state AFTER localStorage is updated
      setUser(data.user)

      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return {
        success: false,
        error: "An error occurred during login",
      }
    }
  }

  const register = async (data: { name: string; email: string; password: string; role: string }) => {
    try {
      // In a real app, this would be an API call to your backend
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok || !responseData.success) {
        return {
          success: false,
          error: responseData.message || "Registration failed",
        }
      }

      return { success: true }
    } catch (error) {
      console.error("Registration error:", error)
      return {
        success: false,
        error: "An error occurred during registration",
      }
    }
  }

  const logout = () => {
    // Clear auth data
    localStorage.removeItem("accessToken")
    localStorage.removeItem("user")
    setUser(null)
  }

  const isAuthenticated = !!user
  const isAdmin = user?.role === "admin"
  const isCreator = user?.role === "creator" || isAdmin

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        isAdmin,
        isCreator,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
