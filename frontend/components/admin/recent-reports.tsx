import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Video, MessageSquare, User } from "lucide-react"

export function AdminRecentReports() {
  const reports = [
    {
      id: "1",
      type: "video",
      title: "Inappropriate content in video",
      reporter: "Jane Smith",
      reporterAvatar: "/placeholder.svg?height=32&width=32",
      time: "2 hours ago",
      status: "pending",
    },
    {
      id: "2",
      type: "comment",
      title: "Hate speech in comments",
      reporter: "John Doe",
      reporterAvatar: "/placeholder.svg?height=32&width=32",
      time: "3 hours ago",
      status: "pending",
    },
    {
      id: "3",
      type: "user",
      title: "User impersonation",
      reporter: "Michael Brown",
      reporterAvatar: "/placeholder.svg?height=32&width=32",
      time: "1 day ago",
      status: "pending",
    },
    {
      id: "4",
      type: "video",
      title: "Copyright claim on video",
      reporter: "Sarah Wilson",
      reporterAvatar: "/placeholder.svg?height=32&width=32",
      time: "1 day ago",
      status: "pending",
    },
  ]

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div key={report.id} className="flex items-center gap-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
            {report.type === "video" && <Video className="h-5 w-5" />}
            {report.type === "comment" && <MessageSquare className="h-5 w-5" />}
            {report.type === "user" && <User className="h-5 w-5" />}
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{report.title}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>Reported by</span>
              <Avatar className="mx-1 h-4 w-4">
                <AvatarImage src={report.reporterAvatar || "/placeholder.svg"} alt={report.reporter} />
                <AvatarFallback>{report.reporter.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{report.reporter}</span>
              <span className="mx-1">•</span>
              <span>{report.time}</span>
            </div>
          </div>
          <Button size="sm" variant="outline">
            Review
          </Button>
        </div>
      ))}
      <div className="flex justify-center pt-2">
        <Button variant="link" size="sm" className="text-xs">
          View all reports
        </Button>
      </div>
    </div>
  )
}
