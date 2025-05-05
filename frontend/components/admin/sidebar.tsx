"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Users,
  Video,
  Flag,
  Settings,
  BarChart,
  AlertTriangle,
  FileText,
  MessageSquare,
  Home,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12 border-r", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Admin</h2>
          <div className="space-y-1">
            <Button
              variant={pathname === "/admin" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/admin">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button
              variant={pathname === "/admin/users" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/admin/users">
                <Users className="mr-2 h-4 w-4" />
                User Management
              </Link>
            </Button>
            <Button
              variant={pathname === "/admin/content" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/admin/content">
                <Video className="mr-2 h-4 w-4" />
                Content Management
              </Link>
            </Button>
            <Button
              variant={pathname === "/admin/reports" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/admin/reports">
                <Flag className="mr-2 h-4 w-4" />
                Reports
              </Link>
            </Button>
            <Button
              variant={pathname === "/admin/analytics" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/admin/analytics">
                <BarChart className="mr-2 h-4 w-4" />
                Analytics
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Moderation</h2>
          <div className="space-y-1">
            <Button
              variant={pathname === "/admin/moderation/content" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/admin/moderation/content">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Flagged Content
              </Link>
            </Button>
            <Button
              variant={pathname === "/admin/moderation/comments" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/admin/moderation/comments">
                <MessageSquare className="mr-2 h-4 w-4" />
                Comment Moderation
              </Link>
            </Button>
            <Button
              variant={pathname === "/admin/moderation/appeals" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/admin/moderation/appeals">
                <FileText className="mr-2 h-4 w-4" />
                Appeals
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">System</h2>
          <div className="space-y-1">
            <Button
              variant={pathname === "/admin/settings" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                Platform Settings
              </Link>
            </Button>
            <Button
              variant={pathname === "/admin/security" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/admin/security">
                <Shield className="mr-2 h-4 w-4" />
                Security
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
