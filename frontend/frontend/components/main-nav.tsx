"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import { Bell, Menu, Play, Search, Upload } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export function MainNav() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
                onClick={() => document.body.click()}
              >
                <Play className="h-6 w-6 fill-primary text-primary-foreground" />
                <span>StreamVibe</span>
              </Link>
              <Link
                href="/"
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                  isActive("/") ? "bg-accent" : "hover:bg-accent",
                )}
                onClick={() => document.body.click()}
              >
                Home
              </Link>
              <Link
                href="/trending"
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                  isActive("/trending") ? "bg-accent" : "hover:bg-accent",
                )}
                onClick={() => document.body.click()}
              >
                Trending
              </Link>
              <Link
                href="/live"
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                  isActive("/live") ? "bg-accent" : "hover:bg-accent",
                )}
                onClick={() => document.body.click()}
              >
                Live
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                      isActive("/dashboard") ? "bg-accent" : "hover:bg-accent",
                    )}
                    onClick={() => document.body.click()}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/upload"
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                      isActive("/dashboard/upload") ? "bg-accent" : "hover:bg-accent",
                    )}
                    onClick={() => document.body.click()}
                  >
                    Upload
                  </Link>
                  <Button variant="outline" onClick={handleLogout}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button asChild>
                    <Link href="/login" onClick={() => document.body.click()}>
                      Sign In
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/signup" onClick={() => document.body.click()}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex items-center gap-2">
          <Play className="h-6 w-6 fill-primary text-primary-foreground" />
          <span className="hidden text-lg font-bold sm:inline-block">StreamVibe</span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {[
                    { name: "Movies", href: "/category/1" },
                    { name: "Music", href: "/category/2" },
                    { name: "Gaming", href: "/category/3" },
                    { name: "Food", href: "/category/4" },
                    { name: "Business", href: "/category/5" },
                    { name: "Fitness", href: "/category/6" },
                    { name: "Art", href: "/category/7" },
                    { name: "Education", href: "/category/8" },
                  ].map((category) => (
                    <li key={category.name}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={category.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{category.name}</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/trending" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Trending</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/live" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Live</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2">
          <div className={cn("relative", isSearchOpen ? "flex" : "hidden md:flex")}>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search videos..."
              className="w-[200px] rounded-full bg-muted pl-8 md:w-[200px] lg:w-[300px]"
            />
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <ModeToggle />

          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
                <Link href="/dashboard/upload">
                  <Upload className="h-5 w-5" />
                  <span className="sr-only">Upload</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user?.name || "User"} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user?.name}</span>
                      <span className="text-xs text-muted-foreground">{user?.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden gap-2 md:flex">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
