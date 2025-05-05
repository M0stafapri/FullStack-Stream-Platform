"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { Loader2, Video, Upload } from "lucide-react"
import Link from "next/link"
import { PopularVideos } from "@/components/dashboard/popular-videos"

export default function VideosPage() {
  const { user, isAuthenticated, isCreator } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [videos, setVideos] = useState<any[]>([])

  useEffect(() => {
    const fetchVideos = async () => {
      if (!isAuthenticated) return

      try {
        // In a real app, this would fetch from your API
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data - In production, replace with actual API call
        setVideos([
          {
            id: "1",
            title: "How to Create a Stunning Video Intro",
            thumbnail: "/placeholder.svg?height=120&width=200",
            views: 1240,
            likes: 89,
            comments: 12,
            date: "2023-04-15",
            status: "published",
          },
          {
            id: "2",
            title: "Top 5 Camera Settings for Better Videos",
            thumbnail: "/placeholder.svg?height=120&width=200",
            views: 856,
            likes: 67,
            comments: 8,
            date: "2023-04-10",
            status: "published",
          },
          {
            id: "3",
            title: "Video Editing Tips for Beginners",
            thumbnail: "/placeholder.svg?height=120&width=200",
            views: 2103,
            likes: 145,
            comments: 23,
            date: "2023-04-05",
            status: "published",
          },
          {
            id: "4",
            title: "Lighting Techniques for Home Studios",
            thumbnail: "/placeholder.svg?height=120&width=200",
            views: 0,
            likes: 0,
            comments: 0,
            date: "2023-04-01",
            status: "draft",
          },
        ])
      } catch (error) {
        console.error("Error fetching videos:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVideos()
  }, [isAuthenticated])

  if (!isCreator) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <div className="text-center space-y-4">
          <Video className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="text-2xl font-bold">Creator Access Required</h2>
          <p className="text-muted-foreground max-w-md">You need a creator account to upload and manage videos.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Videos</h2>
          <p className="text-muted-foreground">Manage your uploaded content</p>
        </div>

        <Button asChild>
          <Link href="/dashboard/upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload New Video
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="published" className="space-y-4">
        <TabsList>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="all">All Videos</TabsTrigger>
        </TabsList>

        <TabsContent value="published" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : videos.filter((v) => v.status === "published").length > 0 ? (
            <PopularVideos videos={videos.filter((v) => v.status === "published")} />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Video className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No published videos yet</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Your published videos will appear here. Start creating and sharing your content.
                </p>
                <Button asChild>
                  <Link href="/dashboard/upload">Upload Video</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : videos.filter((v) => v.status === "draft").length > 0 ? (
            <PopularVideos videos={videos.filter((v) => v.status === "draft")} />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Video className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No draft videos</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Save videos as drafts while you're working on them.
                </p>
                <Button asChild>
                  <Link href="/dashboard/upload">Create a Draft</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : videos.length > 0 ? (
            <PopularVideos videos={videos} />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Video className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No videos yet</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Upload your first video to get started.
                </p>
                <Button asChild>
                  <Link href="/dashboard/upload">Upload Video</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
