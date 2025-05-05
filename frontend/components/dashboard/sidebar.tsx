"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Video, Upload, Heart, Clock, Settings, Users, BarChart, LogOut, Radio } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { logout, isCreator, isAdmin } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className={cn("w-64 border-r border-white/10 bg-black", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold text-white">Dashboard</h2>
          <div className="space-y-1">
            <Button
              variant={pathname === "/dashboard" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start text-white hover:bg-white/10"
              asChild
            >
              <Link href="/dashboard">
                <Home className="mr-2 h-4 w-4" />
                Overview
              </Link>
            </Button>
            {isCreator && (
              <>
                <Button
                  variant={pathname === "/dashboard/videos" ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/dashboard/videos">
                    <Video className="mr-2 h-4 w-4" />
                    My Videos
                  </Link>
                </Button>
                <Button
                  variant={pathname === "/dashboard/upload" ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/dashboard/upload">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Link>
                </Button>
                <Button
                  variant={pathname === "/dashboard/livestream" ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/dashboard/livestream">
                    <Radio className="mr-2 h-4 w-4" />
                    Go Live
                  </Link>
                </Button>
                <Button
                  variant={pathname === "/dashboard/analytics" ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/dashboard/analytics">
                    <BarChart className="mr-2 h-4 w-4" />
                    Analytics
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold text-white">Library</h2>
          <div className="space-y-1">
            <Button
              variant={pathname === "/dashboard/liked" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start text-white hover:bg-white/10"
              asChild
            >
              <Link href="/dashboard/liked">
                <Heart className="mr-2 h-4 w-4" />
                Liked Videos
              </Link>
            </Button>
            <Button
              variant={pathname === "/dashboard/history" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start text-white hover:bg-white/10"
              asChild
            >
              <Link href="/dashboard/history">
                <Clock className="mr-2 h-4 w-4" />
                Watch History
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold text-white">Settings</h2>
          <div className="space-y-1">
            <Button
              variant={pathname === "/dashboard/profile" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start text-white hover:bg-white/10"
              asChild
            >
              <Link href="/dashboard/profile">
                <Users className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </Button>
            <Button
              variant={pathname === "/dashboard/settings" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start text-white hover:bg-white/10"
              asChild
            >
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
            {isAdmin && (
              <Button variant="ghost" size="sm" className="w-full justify-start text-white hover:bg-white/10" asChild>
                <Link href="/admin">
                  <Users className="mr-2 h-4 w-4" />
                  Admin Panel
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="px-3 py-2 mt-auto">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

Sidebar.displayName = "DashboardSidebar"

export { Sidebar as DashboardSidebar }
