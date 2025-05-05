import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function AdminUserActivity() {
  const users = [
    {
      id: "1",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "creator",
      avatar: "/placeholder.svg?height=40&width=40",
      lastActive: "Just now",
      status: "active",
      action: "Uploaded a new video",
    },
    {
      id: "2",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "user",
      avatar: "/placeholder.svg?height=40&width=40",
      lastActive: "5 minutes ago",
      status: "active",
      action: "Commented on a video",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      role: "admin",
      avatar: "/placeholder.svg?height=40&width=40",
      lastActive: "30 minutes ago",
      status: "active",
      action: "Reviewed reported content",
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      role: "creator",
      avatar: "/placeholder.svg?height=40&width=40",
      lastActive: "1 hour ago",
      status: "active",
      action: "Started a livestream",
    },
    {
      id: "5",
      name: "David Johnson",
      email: "david.johnson@example.com",
      role: "user",
      avatar: "/placeholder.svg?height=40&width=40",
      lastActive: "3 hours ago",
      status: "inactive",
      action: "Liked a video",
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Action</TableHead>
          <TableHead>Last Active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  user.role === "admin"
                    ? "bg-primary/10 text-primary"
                    : user.role === "creator"
                      ? "bg-blue-500/10 text-blue-500"
                      : "bg-green-500/10 text-green-500"
                }
              >
                {user.role}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${user.status === "active" ? "bg-green-500" : "bg-orange-500"}`}
                />
                <span className="capitalize">{user.status}</span>
              </div>
            </TableCell>
            <TableCell>{user.action}</TableCell>
            <TableCell>{user.lastActive}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
