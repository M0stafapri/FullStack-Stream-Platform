"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Loader2, Search, Filter } from "lucide-react"
import Image from "next/image"

export default function ReportsPage() {
  const { isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [reports, setReports] = useState<any[]>([])

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/dashboard")
    } else if (!isLoading) {
      // Simulate fetching reports
      setTimeout(() => {
        setReports([
          {
            id: "1",
            type: "video",
            title: "Inappropriate content in video",
            content: {
              id: "video123",
              title: "How to Create a Stunning Video Intro",
              thumbnail: "/placeholder.svg?height=120&width=200",
            },
            reporter: {
              name: "Jane Smith",
              avatar: "/placeholder.svg?height=32&width=32",
            },
            reported: {
              name: "VideoMaster",
              avatar: "/placeholder.svg?height=32&width=32",
            },
            reason: "Inappropriate content",
            details: "This video contains content that violates community guidelines at timestamp 2:45.",
            status: "pending",
            timestamp: "2023-07-15T15:30:00",
          },
          {
            id: "2",
            type: "comment",
            title: "Hate speech in comments",
            content: {
              id: "comment456",
              text: "This comment contains hate speech and should be removed.",
            },
            reporter: {
              name: "John Doe",
              avatar: "/placeholder.svg?height=32&width=32",
            },
            reported: {
              name: "CommentUser",
              avatar: "/placeholder.svg?height=32&width=32",
            },
            reason: "Hate speech",
            details: "This comment contains hate speech targeting a specific group.",
            status: "pending",
            timestamp: "2023-07-15T14:25:00",
          },
          {
            id: "3",
            type: "user",
            title: "User impersonation",
            content: {
              id: "user789",
            },
            reporter: {
              name: "Michael Brown",
              avatar: "/placeholder.svg?height=32&width=32",
            },
            reported: {
              name: "FakeCelebrity",
              avatar: "/placeholder.svg?height=32&width=32",
            },
            reason: "Impersonation",
            details: "This user is impersonating a well-known celebrity and misleading viewers.",
            status: "pending",
            timestamp: "2023-07-15T12:10:00",
          },
          {
            id: "4",
            type: "video",
            title: "Copyright claim on video",
            content: {
              id: "video456",
              title: "Top 10 Travel Destinations 2024",
              thumbnail: "/placeholder.svg?height=120&width=200",
            },
            reporter: {
              name: "Sarah Wilson",
              avatar: "/placeholder.svg?height=32&width=32",
            },
            reported: {
              name: "TravelCreator",
              avatar: "/placeholder.svg?height=32&width=32",
            },
            reason: "Copyright infringement",
            details: "This video uses my copyrighted content without permission.",
            status: "resolved",
            timestamp: "2023-07-14T10:45:00",
          },
          {
            id: "5",
            type: "comment",
            title: "Spam in comments section",
            content: {
              id: "comment789",
              text: "Check out my channel for free stuff! Link in bio!",
            },
            reporter: {
              name: "David Johnson",
              avatar: "/placeholder.svg?height=32&width=32",
            },
            reported: {
              name: "SpamUser",
              avatar: "/placeholder.svg?height=32&width=32",
            },
            reason: "Spam",
            details: "This user is spamming the same comment across multiple videos.",
            status: "rejected",
            timestamp: "2023-07-13T16:30:00",
          },
        ])
        setLoading(false)
      }, 1000)
    }
  }, [isAdmin, isLoading, router])

  const handleReviewReport = (report: any) => {
    setSelectedReport(report)
    setIsReviewDialogOpen(true)
  }

  const handleResolveReport = () => {
    setReports((prev) =>
      prev.map((report) => (report.id === selectedReport.id ? { ...report, status: "resolved" } : report)),
    )
    setIsReviewDialogOpen(false)
  }

  const handleRejectReport = () => {
    setReports((prev) =>
      prev.map((report) => (report.id === selectedReport.id ? { ...report, status: "rejected" } : report)),
    )
    setIsReviewDialogOpen(false)
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || report.status === selectedStatus
    const matchesType = selectedType === "all" || report.type === selectedType
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">Manage user reports and content moderation</p>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reports..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
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
                      <TableHead>Report</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Reported</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          No reports found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>
                            <div className="font-medium">{report.title}</div>
                            <div className="text-xs text-muted-foreground line-clamp-1">{report.reason}</div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                report.type === "video"
                                  ? "bg-blue-500/10 text-blue-500"
                                  : report.type === "comment"
                                    ? "bg-orange-500/10 text-orange-500"
                                    : "bg-green-500/10 text-green-500"
                              }
                            >
                              {report.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={report.reporter.avatar || "/placeholder.svg"}
                                  alt={report.reporter.name}
                                />
                                <AvatarFallback>{report.reporter.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{report.reporter.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={report.reported.avatar || "/placeholder.svg"}
                                  alt={report.reported.name}
                                />
                                <AvatarFallback>{report.reported.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{report.reported.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                report.status === "pending"
                                  ? "default"
                                  : report.status === "resolved"
                                    ? "success"
                                    : "secondary"
                              }
                              className={
                                report.status === "pending"
                                  ? ""
                                  : report.status === "resolved"
                                    ? "bg-green-500/10 text-green-500"
                                    : ""
                              }
                            >
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(report.timestamp).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" onClick={() => handleReviewReport(report)}>
                              Review
                            </Button>
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

        <TabsContent value="pending">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Reporter</TableHead>
                    <TableHead>Reported</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports
                    .filter((report) => report.status === "pending")
                    .map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div className="font-medium">{report.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{report.reason}</div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              report.type === "video"
                                ? "bg-blue-500/10 text-blue-500"
                                : report.type === "comment"
                                  ? "bg-orange-500/10 text-orange-500"
                                  : "bg-green-500/10 text-green-500"
                            }
                          >
                            {report.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={report.reporter.avatar || "/placeholder.svg"}
                                alt={report.reporter.name}
                              />
                              <AvatarFallback>{report.reporter.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{report.reporter.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={report.reported.avatar || "/placeholder.svg"}
                                alt={report.reported.name}
                              />
                              <AvatarFallback>{report.reported.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{report.reported.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(report.timestamp).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleReviewReport(report)}>
                              Review
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

        <TabsContent value="resolved">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Reporter</TableHead>
                    <TableHead>Reported</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports
                    .filter((report) => report.status === "resolved")
                    .map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div className="font-medium">{report.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{report.reason}</div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              report.type === "video"
                                ? "bg-blue-500/10 text-blue-500"
                                : report.type === "comment"
                                  ? "bg-orange-500/10 text-orange-500"
                                  : "bg-green-500/10 text-green-500"
                            }
                          >
                            {report.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={report.reporter.avatar || "/placeholder.svg"}
                                alt={report.reporter.name}
                              />
                              <AvatarFallback>{report.reporter.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{report.reporter.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={report.reported.avatar || "/placeholder.svg"}
                                alt={report.reported.name}
                              />
                              <AvatarFallback>{report.reported.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{report.reported.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(report.timestamp).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => handleReviewReport(report)}>
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Reporter</TableHead>
                    <TableHead>Reported</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports
                    .filter((report) => report.status === "rejected")
                    .map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div className="font-medium">{report.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{report.reason}</div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              report.type === "video"
                                ? "bg-blue-500/10 text-blue-500"
                                : report.type === "comment"
                                  ? "bg-orange-500/10 text-orange-500"
                                  : "bg-green-500/10 text-green-500"
                            }
                          >
                            {report.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={report.reporter.avatar || "/placeholder.svg"}
                                alt={report.reporter.name}
                              />
                              <AvatarFallback>{report.reporter.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{report.reporter.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={report.reported.avatar || "/placeholder.svg"}
                                alt={report.reported.name}
                              />
                              <AvatarFallback>{report.reported.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{report.reported.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(report.timestamp).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => handleReviewReport(report)}>
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Review Report Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Review Report</DialogTitle>
            <DialogDescription>Review and take action on this report.</DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Report Type</Label>
                <div className="col-span-3">
                  <Badge
                    variant="outline"
                    className={
                      selectedReport.type === "video"
                        ? "bg-blue-500/10 text-blue-500"
                        : selectedReport.type === "comment"
                          ? "bg-orange-500/10 text-orange-500"
                          : "bg-green-500/10 text-green-500"
                    }
                  >
                    {selectedReport.type}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Title</Label>
                <div className="col-span-3 font-medium">{selectedReport.title}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Reporter</Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={selectedReport.reporter.avatar || "/placeholder.svg"}
                      alt={selectedReport.reporter.name}
                    />
                    <AvatarFallback>{selectedReport.reporter.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{selectedReport.reporter.name}</span>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Reported</Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={selectedReport.reported.avatar || "/placeholder.svg"}
                      alt={selectedReport.reported.name}
                    />
                    <AvatarFallback>{selectedReport.reported.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{selectedReport.reported.name}</span>
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Reason</Label>
                <div className="col-span-3">
                  <p>{selectedReport.reason}</p>
                  <p className="text-sm text-muted-foreground mt-1">{selectedReport.details}</p>
                </div>
              </div>
              {selectedReport.type === "video" && (
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right pt-2">Content</Label>
                  <div className="col-span-3">
                    <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-md">
                      <Image
                        src={selectedReport.content.thumbnail || "/placeholder.svg"}
                        alt={selectedReport.content.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium mt-2">{selectedReport.content.title}</p>
                  </div>
                </div>
              )}
              {selectedReport.type === "comment" && (
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right pt-2">Content</Label>
                  <div className="col-span-3 p-3 bg-muted rounded-md">
                    <p className="text-sm italic">"{selectedReport.content.text}"</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="notes" className="text-right pt-2">
                  Admin Notes
                </Label>
                <Textarea id="notes" className="col-span-3" placeholder="Add notes about this report..." />
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-between">
            <div>
              {selectedReport?.status === "pending" && (
                <Button variant="destructive" onClick={handleRejectReport}>
                  Reject Report
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                Close
              </Button>
              {selectedReport?.status === "pending" && <Button onClick={handleResolveReport}>Resolve Report</Button>}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
