"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Eye, Heart, MessageSquare, TrendingUp, Calendar, Download } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EngagementChart } from "@/components/dashboard/engagement-chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AnalyticsPage() {
  const { isCreator } = useAuth()
  const [timeRange, setTimeRange] = useState("30days")
  const [isLoading, setIsLoading] = useState(true)
  const [analyticsData, setAnalyticsData] = useState<any>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true)

      try {
        // In a real app, this would fetch from your API with the timeRange parameter
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data - In production, replace with actual API call
        setAnalyticsData({
          summary: {
            views: 48926,
            viewsChange: 12.3, // percentage change from previous period
            watchTime: 982145, // in seconds
            watchTimeChange: 8.7,
            subscribers: 1274,
            subscribersChange: 7.4,
            engagement: 3.2, // percentage
            engagementChange: 0.5,
          },
          topVideos: [
            {
              id: "1",
              title: "How to Create a Stunning Video Intro",
              views: 12487,
              likes: 892,
              comments: 156,
              watchTime: 356240, // in seconds
              ctr: 8.6, // click-through rate (percentage)
              publishDate: "2023-04-15",
            },
            {
              id: "2",
              title: "Advanced Video Editing Techniques",
              views: 8934,
              likes: 678,
              comments: 87,
              watchTime: 254980,
              ctr: 7.2,
              publishDate: "2023-04-10",
            },
            {
              id: "3",
              title: "Video Editing Tips for Beginners",
              views: 7452,
              likes: 543,
              comments: 92,
              watchTime: 201350,
              ctr: 6.9,
              publishDate: "2023-04-05",
            },
            {
              id: "4",
              title: "Lighting Techniques for Home Studios",
              views: 6245,
              likes: 419,
              comments: 53,
              watchTime: 130920,
              ctr: 5.8,
              publishDate: "2023-04-01",
            },
          ],
          trafficSources: [
            { source: "Search", percentage: 42 },
            { source: "Direct/External", percentage: 28 },
            { source: "Browse Features", percentage: 16 },
            { source: "Channel Pages", percentage: 8 },
            { source: "Other", percentage: 6 },
          ],
          demographics: {
            age: [
              { group: "13-17", percentage: 5 },
              { group: "18-24", percentage: 32 },
              { group: "25-34", percentage: 41 },
              { group: "35-44", percentage: 14 },
              { group: "45-54", percentage: 6 },
              { group: "55+", percentage: 2 },
            ],
            gender: [
              { type: "Male", percentage: 68 },
              { type: "Female", percentage: 30 },
              { type: "Other", percentage: 2 },
            ],
            countries: [
              { name: "United States", percentage: 42 },
              { name: "United Kingdom", percentage: 15 },
              { name: "Canada", percentage: 12 },
              { name: "Australia", percentage: 8 },
              { name: "Germany", percentage: 5 },
              { name: "Other", percentage: 18 },
            ],
          },
        })
      } catch (error) {
        console.error("Error fetching analytics:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (isCreator) {
      fetchAnalytics()
    }
  }, [isCreator, timeRange])

  if (!isCreator) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <div className="text-center space-y-4">
          <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="text-2xl font-bold">Creator Access Required</h2>
          <p className="text-muted-foreground max-w-md">
            Analytics are only available for creator accounts. Upgrade your account to access detailed insights.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">Detailed insights about your content performance</p>
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

      {isLoading ? (
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
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.summary.views.toLocaleString()}</div>
                <div
                  className={`text-xs ${analyticsData.summary.viewsChange >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {analyticsData.summary.viewsChange >= 0 ? "+" : ""}
                  {analyticsData.summary.viewsChange}% from previous period
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Watch Time</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatWatchTime(analyticsData.summary.watchTime)}</div>
                <div
                  className={`text-xs ${analyticsData.summary.watchTimeChange >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {analyticsData.summary.watchTimeChange >= 0 ? "+" : ""}
                  {analyticsData.summary.watchTimeChange}% from previous period
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.summary.subscribers.toLocaleString()}</div>
                <div
                  className={`text-xs ${analyticsData.summary.subscribersChange >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {analyticsData.summary.subscribersChange >= 0 ? "+" : ""}
                  {analyticsData.summary.subscribersChange}% from previous period
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.summary.engagement}%</div>
                <div
                  className={`text-xs ${analyticsData.summary.engagementChange >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {analyticsData.summary.engagementChange >= 0 ? "+" : ""}
                  {analyticsData.summary.engagementChange}% from previous period
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="videos">Top Videos</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
              <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Your channel performance for the {getTimeRangeLabel(timeRange)}</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <EngagementChart />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="videos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Videos</CardTitle>
                  <CardDescription>Your most watched videos for the {getTimeRangeLabel(timeRange)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Video</TableHead>
                        <TableHead className="text-right">Views</TableHead>
                        <TableHead className="text-right">Watch Time</TableHead>
                        <TableHead className="text-right">Likes</TableHead>
                        <TableHead className="text-right">Comments</TableHead>
                        <TableHead className="text-right">CTR</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {analyticsData.topVideos.map((video: any) => (
                        <TableRow key={video.id}>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span className="truncate max-w-[300px]">{video.title}</span>
                              <span className="text-xs text-muted-foreground">
                                Published {new Date(video.publishDate).toLocaleDateString()}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{video.views.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{formatWatchTime(video.watchTime)}</TableCell>
                          <TableCell className="text-right">{video.likes.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{video.comments.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{video.ctr}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audience" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Audience Demographics</CardTitle>
                  <CardDescription>Insights about your viewers for the {getTimeRangeLabel(timeRange)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-8 md:grid-cols-3">
                    <div>
                      <h3 className="text-sm font-medium mb-4">Age Distribution</h3>
                      <div className="space-y-4">
                        {analyticsData.demographics.age.map((item: any) => (
                          <div key={item.group} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{item.group}</span>
                              <span>{item.percentage}%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-secondary">
                              <div className="h-2 rounded-full bg-primary" style={{ width: `${item.percentage}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-4">Gender Distribution</h3>
                      <div className="space-y-4">
                        {analyticsData.demographics.gender.map((item: any) => (
                          <div key={item.type} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{item.type}</span>
                              <span>{item.percentage}%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-secondary">
                              <div className="h-2 rounded-full bg-primary" style={{ width: `${item.percentage}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-4">Top Countries</h3>
                      <div className="space-y-4">
                        {analyticsData.demographics.countries.map((item: any) => (
                          <div key={item.name} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{item.name}</span>
                              <span>{item.percentage}%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-secondary">
                              <div className="h-2 rounded-full bg-primary" style={{ width: `${item.percentage}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="traffic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>
                    How viewers are finding your content for the {getTimeRangeLabel(timeRange)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {analyticsData.trafficSources.map((item: any) => (
                      <div key={item.source} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>{item.source}</span>
                          <span>{item.percentage}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div className="h-2 rounded-full bg-primary" style={{ width: `${item.percentage}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}

function formatWatchTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}

function getTimeRangeLabel(timeRange: string): string {
  switch (timeRange) {
    case "7days":
      return "last 7 days"
    case "30days":
      return "last 30 days"
    case "90days":
      return "last 90 days"
    case "year":
      return "last 12 months"
    case "lifetime":
      return "lifetime of your channel"
    default:
      return "selected period"
  }
}
