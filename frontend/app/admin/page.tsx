"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { User, Video, Flag, TrendingUp, UserX, Settings, Download, Shield, MessageSquare } from "lucide-react"
import { AdminDashboardStats } from "@/components/admin/dashboard-stats"
import { AdminRecentReports } from "@/components/admin/recent-reports"
import { AdminUserActivity } from "@/components/admin/user-activity"
import { AdminContentStats } from "@/components/admin/content-stats"

export default function AdminDashboard() {
  const { isAdmin, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login")
      } else if (!isAdmin) {
        router.push("/dashboard")
      } else {
        // Simulate data loading
        const timer = setTimeout(() => setLoading(false), 1000)
        return () => clearTimeout(timer)
      }
    }
  }, [isAdmin, isLoading, isAuthenticated, router])

  if (isLoading || loading) {
    return <AdminDashboardSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of platform activity, content moderation, and user management
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button variant="default">
            <Settings className="mr-2 h-4 w-4" />
            Platform Settings
          </Button>
        </div>
      </div>

      <AdminDashboardStats />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="moderation">Content Moderation</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Platform Activity</CardTitle>
                <CardDescription>Overview of user and content activity over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <AdminContentStats />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Latest content and user reports requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminRecentReports />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Recent active users on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminUserActivity />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Moderation</CardTitle>
              <CardDescription>Manage reported and flagged content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4 text-center">
                  <Flag className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium mb-1">Content Moderation Interface</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Review and manage flagged content to maintain community guidelines
                  </p>
                </div>
                <div className="border-t p-4">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Video className="h-5 w-5 text-orange-500" />
                        <div>
                          <p className="font-medium">Inappropriate content in video</p>
                          <p className="text-xs text-muted-foreground">Reported 2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="destructive">
                          Remove
                        </Button>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium">Hate speech in comments</p>
                          <p className="text-xs text-muted-foreground">Reported 3 hours ago</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="destructive">
                          Remove
                        </Button>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Video className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="font-medium">Copyright claim on video</p>
                          <p className="text-xs text-muted-foreground">Reported 1 day ago</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="destructive">
                          Remove
                        </Button>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users and roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4 text-center">
                  <User className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium mb-1">User Management Interface</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Review and manage user accounts, roles, and permissions
                  </p>
                </div>
                <div className="border-t p-4">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-3">
                        <UserX className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium">Multiple community guideline violations</p>
                          <p className="text-xs text-muted-foreground">User: john_doe123</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="destructive">
                          Suspend
                        </Button>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">Creator verification request</p>
                          <p className="text-xs text-muted-foreground">User: content_creator_pro</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="default">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Flag className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="font-medium">Account reported for impersonation</p>
                          <p className="text-xs text-muted-foreground">User: fake_celebrity</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="destructive">
                          Suspend
                        </Button>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Analytics</CardTitle>
              <CardDescription>Detailed statistics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4 text-center">
                  <TrendingUp className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium mb-1">Analytics Dashboard</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    In-depth platform metrics and user engagement analytics
                  </p>
                </div>
                <div className="border-t p-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm font-medium">Platform Growth</CardTitle>
                      </CardHeader>
                      <CardContent className="py-0">
                        <div className="text-2xl font-bold">+12.5%</div>
                        <p className="text-xs text-muted-foreground">Increase in monthly active users</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm font-medium">Content Production</CardTitle>
                      </CardHeader>
                      <CardContent className="py-0">
                        <div className="text-2xl font-bold">+8.3%</div>
                        <p className="text-xs text-muted-foreground">Increase in content creation</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm font-medium">User Retention</CardTitle>
                      </CardHeader>
                      <CardContent className="py-0">
                        <div className="text-2xl font-bold">76.2%</div>
                        <p className="text-xs text-muted-foreground">30-day retention rate</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AdminDashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
          <div className="mt-2 h-4 w-96 animate-pulse rounded-md bg-muted" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-7 w-16 animate-pulse rounded bg-muted" />
                <div className="mt-2 h-4 w-20 animate-pulse rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
      </div>

      <div>
        <div className="mb-4 h-10 w-72 animate-pulse rounded-md bg-muted" />
        <div className="h-[400px] animate-pulse rounded-md bg-muted" />
      </div>
    </div>
  )
}
