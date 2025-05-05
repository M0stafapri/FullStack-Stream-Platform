"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export function MainNav() {
  const { isAuthenticated, user, logout } = useAuth()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (!mounted) {
    return null
  }

  return (
    <header className="fixed top-0 w-full z-50 header-gradient">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold innovati-gradient-text">Innovati.</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-white hover:text-white/80 transition-colors">
              Home
            </Link>
            <Link href="/browse" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Browse
            </Link>
            <Link href="/categories" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Categories
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            {showSearch ? (
              <div className="absolute right-0 top-0 w-64 animate-fade-in">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="glass-input text-white pr-8"
                  autoFocus
                  onBlur={() => setShowSearch(false)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setShowSearch(false)}
                >
                  <X className="h-4 w-4 text-white/70" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSearch(true)}
                className="text-white/80 hover:text-white"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>
          {isAuthenticated ? (
            <>
              <Link href="/dashboard/upload">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex border-white/20 text-white hover:bg-white/10 transition-colors"
                >
                  Upload
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="User menu">
                    <Avatar className="h-8 w-8 border border-white/20">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user?.name || "User"} />
                      <AvatarFallback className="bg-red-600 text-white">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass-card border-white/10" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">{user?.name || "User"}</p>
                      <p className="text-xs leading-none text-white/70">{user?.email}</p>
                      <p className="text-xs font-medium mt-1 text-red-500 capitalize">{user?.role}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    className="text-white/80 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10"
                    onClick={() => router.push("/dashboard")}
                  >
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-white/80 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10"
                    onClick={() => router.push("/dashboard/profile")}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-white/80 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10"
                    onClick={() => router.push("/dashboard/settings")}
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    className="text-white/80 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10"
                    onClick={handleLogout}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white transition-colors hidden md:inline-flex"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white transition-colors btn-primary hidden md:inline-flex"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white/80 hover:text-white"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden glass-card animate-fade-in">
          <nav className="flex flex-col p-4 gap-2">
            <Link
              href="/"
              className="text-sm font-medium text-white p-2 hover:bg-white/10 rounded-md transition-colors"
              onClick={() => setShowMobileMenu(false)}
            >
              Home
            </Link>
            <Link
              href="/browse"
              className="text-sm font-medium text-white/70 p-2 hover:bg-white/10 rounded-md transition-colors"
              onClick={() => setShowMobileMenu(false)}
            >
              Browse
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium text-white/70 p-2 hover:bg-white/10 rounded-md transition-colors"
              onClick={() => setShowMobileMenu(false)}
            >
              Categories
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-white/70 p-2 hover:bg-white/10 rounded-md transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/upload"
                  className="text-sm font-medium text-white/70 p-2 hover:bg-white/10 rounded-md transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Upload
                </Link>
              </>
            ) : (
              <div className="flex gap-2 mt-2">
                <Link href="/login" onClick={() => setShowMobileMenu(false)}>
                  <Button variant="outline" size="sm" className="border-white/20 text-white w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setShowMobileMenu(false)}>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
