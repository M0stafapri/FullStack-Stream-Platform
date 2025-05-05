"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Heart, MessageSquare, Users } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { Sidebar as DashboardSidebar } from "@/components/dashboard/sidebar"

export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Only redirect if we've confirmed the user is not authenticated and loading is complete
    if (!isLoading && !isAuthenticated) {
      console.log("Dashboard page: User is not authenticated, redirecting to login")
      router.push("/login")
    } else if (!isLoading && isAuthenticated) {
      console.log("Dashboard page: User is authenticated, loading dashboard")
      // Simulate data loading
      const timer = setTimeout(() => setLoading(false), 500)
      return () => clearTimeout(timer)
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || loading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <MainNav />

      <div className="flex flex-1 mt-16">
        <DashboardSidebar />

        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-white/70">Welcome to your dashboard. Here's an overview of your activity.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-black/60 backdrop-blur-sm border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-white/70" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">45.2K</div>
                  <p className="text-xs text-white/70">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-black/60 backdrop-blur-sm border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Total Likes</CardTitle>
                  <Heart className="h-4 w-4 text-white/70" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">2,350</div>
                  <p className="text-xs text-white/70">+15.3% from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-black/60 backdrop-blur-sm border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Comments</CardTitle>
                  <MessageSquare className="h-4 w-4 text-white/70" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">482</div>
                  <p className="text-xs text-white/70">+12.7% from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-black/60 backdrop-blur-sm border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Subscribers</CardTitle>
                  <Users className="h-4 w-4 text-white/70" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">1,274</div>
                  <p className="text-xs text-white/70">+7.4% from last month</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="bg-white/10 text-white">
                <TabsTrigger value="overview" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                >
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="videos" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                  My Videos
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <Card className="bg-black/60 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Overview Content</CardTitle>
                    <CardDescription className="text-white/70">
                      View your performance metrics and recent activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center text-white/50">
                      Chart and analytics data will be displayed here
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analytics" className="space-y-4">
                <Card className="bg-black/60 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Analytics</CardTitle>
                    <CardDescription className="text-white/70">Detailed statistics about your content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center text-white/50">
                      Detailed analytics will be displayed here
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="videos" className="space-y-4">
                <Card className="bg-black/60 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">My Videos</CardTitle>
                    <CardDescription className="text-white/70">Manage your uploaded content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center text-white/50">
                      Your videos will be displayed here
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <MainNav />

      <div className="flex flex-1 mt-16">
        <div className="w-64 border-r border-white/10"></div>

        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="h-8 w-48 animate-pulse rounded-md bg-white/10" />
                <div className="mt-2 h-4 w-96 animate-pulse rounded-md bg-white/10" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="bg-black/60 backdrop-blur-sm border-white/10">
                    <CardHeader className="p-4">
                      <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="h-7 w-16 animate-pulse rounded bg-white/10" />
                      <div className="mt-2 h-4 w-20 animate-pulse rounded bg-white/10" />
                    </CardContent>
                  </Card>
                ))}
            </div>

            <div>
              <div className="mb-4 h-10 w-72 animate-pulse rounded-md bg-white/10" />
              <div className="h-[400px] animate-pulse rounded-md bg-white/10" />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
