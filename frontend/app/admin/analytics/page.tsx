"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Download, Users, Video, Eye, Heart, MessageSquare } from "lucide-react"
import { AdminContentStats } from "@/components/admin/content-stats"

export default function AnalyticsPage() {
  const { isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [timeRange, setTimeRange] = useState("30days")

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/dashboard")
    }
  }, [isAdmin, isLoading, router])

  const platformStats = {
    users: {
      total: 12487,
      growth: 12.5,
      active: 8932,
      activeGrowth: 8.3,
      new: 256,
      newGrowth: 15.2,
    },
    content: {
      totalVideos: 5842,
      newVideos: 128,
      totalViews: 1245789,
      viewsGrowth: 18.7,
      totalLikes: 342567,
      likesGrowth: 14.2,
      totalComments: 78932,
      commentsGrowth: 9.5,
    },
    engagement: {
      averageWatchTime: "4:32",
      watchTimeGrowth: 7.8,
      completionRate: 68.4,
      completionRateGrowth: 3.2,
      interactionRate: 5.7,
      interactionRateGrowth: 1.5,
    },
  }

  const topContent = [
    {
      title: "How to Create a Stunning Video Intro",
      creator: "VideoMaster",
      views: 45200,
      likes: 2300,
      comments: 156,
      watchTime: "4:12",
      completionRate: 78.5,
    },
    {
      title: "Top 10 Travel Destinations 2024",
      creator: "GlobeTrotter",
      views: 38900,
      likes: 1850,
      comments: 132,
      watchTime: "5:45",
      completionRate: 72.3,
    },
    {
      title: "Morning Yoga Routine for Beginners",
      creator: "YogaLife",
      views: 33800,
      likes: 2100,
      comments: 98,
      watchTime: "6:20",
      completionRate: 81.7,
    },
    {
      title: "Advanced Video Editing Techniques",
      creator: "EditPro",
      views: 32500,
      likes: 1750,
      comments: 87,
      watchTime: "3:58",
      completionRate: 65.2,
    },
    {
      title: "Easy Homemade Pizza Recipe",
      creator: "ChefDelights",
      views: 28900,
      likes: 1450,
      comments: 76,
      watchTime: "4:35",
      completionRate: 74.8,
    },
  ]

  const topCreators = [
    {
      name: "VideoMaster",
      subscribers: 125000,
      videos: 87,
      totalViews: 4520000,
      engagement: 8.7,
    },
    {
      name: "GlobeTrotter",
      subscribers: 98500,
      videos: 64,
      totalViews: 3890000,
      engagement: 7.9,
    },
    {
      name: "YogaLife",
      subscribers: 76000,
      videos: 112,
      totalViews: 3380000,
      engagement: 9.2,
    },
    {
      name: "EditPro",
      subscribers: 65000,
      videos: 53,
      totalViews: 2850000,
      engagement: 6.8,
    },
    {
      name: "ChefDelights",
      subscribers: 58000,
      videos: 78,
      totalViews: 2450000,
      engagement: 7.5,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">Platform performance metrics and insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
              <SelectItem value="lifetime">Lifetime</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download report</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.users.total.toLocaleString()}</div>
            <div className={`text-xs ${platformStats.users.growth >= 0 ? "text-green-500" : "text-red-500"}`}>
              {platformStats.users.growth >= 0 ? "+" : ""}
              {platformStats.users.growth}% from previous period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.content.totalVideos.toLocaleString()}</div>
            <div className="text-xs text-green-500">+{platformStats.content.newVideos} this period</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.content.totalViews.toLocaleString()}</div>
            <div className={`text-xs ${platformStats.content.viewsGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
              {platformStats.content.viewsGrowth >= 0 ? "+" : ""}
              {platformStats.content.viewsGrowth}% from previous period
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Activity</CardTitle>
              <CardDescription>Overview of user and content activity over time</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <AdminContentStats />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Active Users</CardTitle>
                <CardDescription>Monthly active users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformStats.users.active.toLocaleString()}</div>
                <div className={`text-xs ${platformStats.users.activeGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {platformStats.users.activeGrowth >= 0 ? "+" : ""}
                  {platformStats.users.activeGrowth}% from previous period
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Watch Time</CardTitle>
                <CardDescription>Per video</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformStats.engagement.averageWatchTime}</div>
                <div
                  className={`text-xs ${platformStats.engagement.watchTimeGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {platformStats.engagement.watchTimeGrowth >= 0 ? "+" : ""}
                  {platformStats.engagement.watchTimeGrowth}% from previous period
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Completion Rate</CardTitle>
                <CardDescription>Average video completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformStats.engagement.completionRate}%</div>
                <div
                  className={`text-xs ${platformStats.engagement.completionRateGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {platformStats.engagement.completionRateGrowth >= 0 ? "+" : ""}
                  {platformStats.engagement.completionRateGrowth}% from previous period
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
              <CardDescription>Most viewed and engaged content</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Creator</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Likes</TableHead>
                    <TableHead>Comments</TableHead>
                    <TableHead>Avg. Watch Time</TableHead>
                    <TableHead>Completion Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topContent.map((content, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{content.title}</TableCell>
                      <TableCell>{content.creator}</TableCell>
                      <TableCell>{content.views.toLocaleString()}</TableCell>
                      <TableCell>{content.likes.toLocaleString()}</TableCell>
                      <TableCell>{content.comments.toLocaleString()}</TableCell>
                      <TableCell>{content.watchTime}</TableCell>
                      <TableCell>{content.completionRate}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
                <Video className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformStats.content.totalVideos.toLocaleString()}</div>
                <div className="text-xs text-green-500">+{platformStats.content.newVideos} this period</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformStats.content.totalViews.toLocaleString()}</div>
                <div
                  className={`text-xs ${platformStats.content.viewsGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {platformStats.content.viewsGrowth >= 0 ? "+" : ""}
                  {platformStats.content.viewsGrowth}% from previous period
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformStats.content.totalLikes.toLocaleString()}</div>
                <div
                  className={`text-xs ${platformStats.content.likesGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {platformStats.content.likesGrowth >= 0 ? "+" : ""}
                  {platformStats.content.likesGrowth}% from previous period
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformStats.content.totalComments.toLocaleString()}</div>
                <div
                  className={`text-xs ${platformStats.content.commentsGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {platformStats.content.commentsGrowth >= 0 ? "+" : ""}
                  {platformStats.content.commentsGrowth}% from previous period
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Creators</CardTitle>
              <CardDescription>Most popular content creators</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Creator</TableHead>
                    <TableHead>Subscribers</TableHead>
                    <TableHead>Videos</TableHead>
                    <TableHead>Total Views</TableHead>
                    <TableHead>Engagement Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCreators.map((creator, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{creator.name}</TableCell>
                      <TableCell>{creator.subscribers.toLocaleString()}</TableCell>
                      <TableCell>{creator.videos}</TableCell>
                      <TableCell>{creator.totalViews.toLocaleString()}</TableCell>
                      <TableCell>{creator.engagement}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New users over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformStats.users.new.toLocaleString()}</div>
                <div className={`text-xs ${platformStats.users.newGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {platformStats.users.newGrowth >= 0 ? "+" : ""}
                  {platformStats.users.newGrowth}% from previous period
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Users</CardTitle>
                <CardDescription>Monthly active users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformStats.users.active.toLocaleString()}</div>
                <div className={`text-xs ${platformStats.users.activeGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {platformStats.users.activeGrowth >= 0 ? "+" : ""}
                  {platformStats.users.activeGrowth}% from previous period
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>User Retention</CardTitle>
                <CardDescription>30-day retention rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">76.2%</div>
                <div className="text-xs text-green-500">+2.5% from previous period</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>User interaction with content</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <AdminContentStats />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Average Watch Time</CardTitle>
                <CardDescription>Per video</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformStats.engagement.averageWatchTime}</div>
                <div
                  className={`text-xs ${platformStats.engagement.watchTimeGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {platformStats.engagement.watchTimeGrowth >= 0 ? "+" : ""}
                  {platformStats.engagement.watchTimeGrowth}% from previous period
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Completion Rate</CardTitle>
                <CardDescription>Average video completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformStats.engagement.completionRate}%</div>
                <div
                  className={`text-xs ${platformStats.engagement.completionRateGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {platformStats.engagement.completionRateGrowth >= 0 ? "+" : ""}
                  {platformStats.engagement.completionRateGrowth}% from previous period
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Interaction Rate</CardTitle>
                <CardDescription>Likes, comments per view</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformStats.engagement.interactionRate}%</div>
                <div
                  className={`text-xs ${platformStats.engagement.interactionRateGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {platformStats.engagement.interactionRateGrowth >= 0 ? "+" : ""}
                  {platformStats.engagement.interactionRateGrowth}% from previous period
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
