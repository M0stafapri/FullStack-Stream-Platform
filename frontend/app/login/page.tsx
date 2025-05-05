"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { MainNav } from "@/components/main-nav"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, isAuthenticated } = useAuth()
  const registered = searchParams?.get("registered")

  // Update the login page to handle authentication state more reliably
  // Modify the useEffect hook to prevent premature redirects

  // Replace the existing useEffect with this improved version:
  useEffect(() => {
    // Only redirect if we've confirmed the user is authenticated and loading is complete
    if (!isLoading && isAuthenticated) {
      console.log("Login page: User is authenticated, redirecting to dashboard")
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, router])

  // Update the handleSubmit function to handle the login flow better
  // Replace the existing handleSubmit function with this improved version:
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Basic validation
    if (!email || !password) {
      setError("Email and password are required")
      setIsLoading(false)
      return
    }

    try {
      console.log("Attempting login with:", email)
      const result = await login(email, password)

      if (result.success) {
        console.log("Login successful, redirecting to dashboard")
        // Add a small delay before redirect to ensure state updates
        setTimeout(() => {
          router.push("/dashboard")
        }, 100)
      } else {
        console.log("Login failed:", result.error)
        setError(result.error || "Invalid email or password")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <MainNav />

      <div className="flex-1 flex items-center justify-center p-4 mt-16">
        <Card className="w-full max-w-md bg-black/60 backdrop-blur-sm border-white/10">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-red-600">Innovati.</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">Sign in to your account</CardTitle>
            <CardDescription className="text-white/70">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {registered && (
                <div className="p-3 text-sm text-white bg-green-600/20 border border-green-600/30 rounded-md">
                  Account created successfully! Please sign in.
                </div>
              )}

              {error && (
                <div className="p-3 text-sm text-white bg-red-600/20 border border-red-600/30 rounded-md">{error}</div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Link href="#" className="text-sm text-red-500 hover:text-red-400">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
              <div className="mt-4 text-center text-sm text-white/70">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-red-500 hover:text-red-400">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
