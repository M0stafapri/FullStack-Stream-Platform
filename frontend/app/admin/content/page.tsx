"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Filter, MoreHorizontal, Eye, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function ContentManagementPage() {
  const { isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [videos, setVideos] = useState<any[]>([])

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/dashboard")
    } else if (!isLoading) {
      // Simulate fetching videos
      setTimeout(() => {
        setVideos([
          {
            id: "1",
            title: "How to Create a Stunning Video Intro",
            thumbnail: "/placeholder.svg?height=120&width=200",
            duration: "12:34",
            views: "45.2K",
            likes: 2300,
            status: "published",
            category: "Education",
            creator: {
              name: "VideoMaster",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            uploadDate: "2023-04-15",
            flags: 0,
          },
          {
            id: "2",
            title: "Advanced Video Editing Techniques",
            thumbnail: "/placeholder.svg?height=120&width=200",
            duration: "18:24",
            views: "32.5K",
            likes: 1850,
            status: "published",
            category: "Education",
            creator: {
              name: "EditPro",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            uploadDate: "2023-04-10",
            flags: 0,
          },
          {
            id: "3",
            title: "Top 10 Travel Destinations 2024",
            thumbnail: "/placeholder.svg?height=120&width=200",
            duration: "21:08",
            views: "189K",
            likes: 15700,
            status: "published",
            category: "Travel",
            creator: {
              name: "GlobeTrotter",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            uploadDate: "2023-04-05",
            flags: 2,
          },
          {
            id: "4",
            title: "Morning Yoga Routine for Beginners",
            thumbnail: "/placeholder.svg?height=120&width=200",
            duration: "22:10",
            views: "33.8K",
            likes: 2100,
            status: "published",
            category: "Fitness",
            creator: {
              name: "YogaLife",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            uploadDate: "2023-04-01",
            flags: 0,
          },
          {
            id: "5",
            title: "Inappropriate Content - Flagged",
            thumbnail: "/placeholder.svg?height=120&width=200",
            duration: "15:30",
            views: "28.9K",
            likes: 1200,
            status: "flagged",
            category: "Entertainment",
            creator: {
              name: "ContentCreator",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            uploadDate: "2023-03-20",
            flags: 5,
          },
        ])
        setLoading(false)
      }, 1000)
    }
  }, [isAdmin, isLoading, router])

  const handleDeleteVideo = (videoId: string) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      // In a real app, this would delete the video from the database
      setVideos((prev) => prev.filter((video) => video.id !== videoId))
    }
  }

  const handleToggleVideoStatus = (videoId: string) => {
    // In a real app, this would update the video status in the database
    setVideos((prev) =>
      prev.map((video) =>
        video.id === videoId
          ? {
              ...video,
              status: video.status === "published" ? "unpublished" : "published",
            }
          : video,
      ),
    )
  }

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || video.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Content Management</h2>
          <p className="text-muted-foreground">Manage videos, livestreams, and other content</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => {}}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="flagged">Flagged</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="livestreams">Livestreams</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search content..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter Content</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <Label htmlFor="category-filter" className="text-xs">
                    Category
                  </Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger id="category-filter">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="Travel">Travel</SelectItem>
                      <SelectItem value="Fitness">Fitness</SelectItem>
                      <SelectItem value="Gaming">Gaming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-2">
                  <Label htmlFor="status-filter" className="text-xs">
                    Status
                  </Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger id="status-filter">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="unpublished">Unpublished</SelectItem>
                      <SelectItem value="flagged">Flagged</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Content</TableHead>
                      <TableHead>Creator</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVideos.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          No content found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredVideos.map((video) => (
                        <TableRow key={video.id}>
                          <TableCell className="flex items-center gap-3">
                            <div className="relative h-12 w-20 flex-shrink-0 overflow-hidden rounded-md">
                              <Image
                                src={video.thumbnail || "/placeholder.svg"}
                                alt={video.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute bottom-1 right-1 rounded bg-black/70 px-1 py-0.5 text-xs font-medium text-white">
                                {video.duration}
                              </div>
                            </div>
                            <div>
                              <div className="font-medium line-clamp-1">{video.title}</div>
                              {video.flags > 0 && (
                                <Badge variant="destructive" className="mt-1">
                                  {video.flags} flags
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={video.creator.avatar || "/placeholder.svg"}
                                  alt={video.creator.name}
                                />
                                <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{video.creator.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{video.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                video.status === "published"
                                  ? "default"
                                  : video.status === "flagged"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {video.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{video.views}</TableCell>
                          <TableCell>{video.uploadDate}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" /> View
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleVideoStatus(video.id)}>
                                  {video.status === "published" ? "Unpublish" : "Publish"}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-500" onClick={() => handleDeleteVideo(video.id)}>
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flagged">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Content</TableHead>
                    <TableHead>Creator</TableHead>
                    <TableHead>Flags</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVideos
                    .filter((video) => video.status === "flagged" || video.flags > 0)
                    .map((video) => (
                      <TableRow key={video.id}>
                        <TableCell className="flex items-center gap-3">
                          <div className="relative h-12 w-20 flex-shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={video.thumbnail || "/placeholder.svg"}
                              alt={video.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="font-medium line-clamp-1">{video.title}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={video.creator.avatar || "/placeholder.svg"} alt={video.creator.name} />
                              <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{video.creator.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="destructive">{video.flags} flags</Badge>
                        </TableCell>
                        <TableCell>Inappropriate content</TableCell>
                        <TableCell>{video.uploadDate}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              Review
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteVideo(video.id)}>
                              Remove
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trending">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Content</TableHead>
                    <TableHead>Creator</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Likes</TableHead>
                    <TableHead>Engagement Rate</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVideos
                    .sort(
                      (a, b) =>
                        Number.parseInt(b.views.replace(/[^0-9]/g, "")) -
                        Number.parseInt(a.views.replace(/[^0-9]/g, "")),
                    )
                    .slice(0, 5)
                    .map((video) => (
                      <TableRow key={video.id}>
                        <TableCell className="flex items-center gap-3">
                          <div className="relative h-12 w-20 flex-shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={video.thumbnail || "/placeholder.svg"}
                              alt={video.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="font-medium line-clamp-1">{video.title}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={video.creator.avatar || "/placeholder.svg"} alt={video.creator.name} />
                              <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{video.creator.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{video.views}</TableCell>
                        <TableCell>{video.likes.toLocaleString()}</TableCell>
                        <TableCell>
                          {((video.likes / Number.parseInt(video.views.replace(/[^0-9]/g, ""))) * 100).toFixed(1)}%
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Feature
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="livestreams">
          <Card>
            <CardHeader>
              <CardTitle>Livestreams</CardTitle>
              <CardDescription>Currently active and scheduled livestreams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4 text-center">
                  <h3 className="font-medium mb-1">No Active Livestreams</h3>
                  <p className="text-sm text-muted-foreground mb-4">There are no active livestreams at the moment</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
