"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Shield, Lock, Key, RefreshCw } from "lucide-react"

export default function SecurityPage() {
  const { isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/dashboard")
    }
  }, [isAdmin, isLoading, router])

  const [securitySettings, setSecuritySettings] = useState({
    authentication: {
      twoFactorAuth: true,
      passwordComplexity: "high",
      sessionTimeout: "30",
      maxLoginAttempts: "5",
      passwordExpiry: "90",
    },
    privacy: {
      dataRetention: "365",
      userDataExport: true,
      anonymizeDeletedUsers: true,
      cookieConsent: true,
      privacyPolicyVersion: "1.2",
    },
    api: {
      rateLimit: "100",
      requireApiKeys: true,
      logApiRequests: true,
      allowCors: true,
      apiKeyExpiry: "90",
    },
  })

  const [securityLogs] = useState([
    {
      id: "1",
      event: "Login attempt failed",
      ip: "192.168.1.1",
      user: "john.doe@example.com",
      timestamp: "2023-07-15T15:30:00",
      severity: "medium",
    },
    {
      id: "2",
      event: "Admin login successful",
      ip: "203.0.113.45",
      user: "admin@example.com",
      timestamp: "2023-07-15T14:25:00",
      severity: "info",
    },
    {
      id: "3",
      event: "Password reset requested",
      ip: "198.51.100.23",
      user: "jane.smith@example.com",
      timestamp: "2023-07-15T12:10:00",
      severity: "info",
    },
    {
      id: "4",
      event: "Multiple login failures",
      ip: "203.0.113.12",
      user: "unknown",
      timestamp: "2023-07-15T10:45:00",
      severity: "high",
    },
    {
      id: "5",
      event: "User account locked",
      ip: "192.168.1.1",
      user: "john.doe@example.com",
      timestamp: "2023-07-15T10:35:00",
      severity: "medium",
    },
  ])

  const [blockedIPs] = useState([
    { ip: "203.0.113.12", reason: "Multiple failed login attempts", timestamp: "2023-07-15T10:45:00" },
    { ip: "198.51.100.45", reason: "Suspicious activity", timestamp: "2023-07-14T22:15:00" },
    { ip: "192.0.2.78", reason: "API abuse", timestamp: "2023-07-13T14:30:00" },
  ])

  const handleInputChange = (section: string, field: string, value: any) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const saveSettings = () => {
    // In a real app, this would save to API
    setSuccessMessage("Security settings saved successfully!")
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Security</h2>
          <p className="text-muted-foreground">Manage platform security and access controls</p>
        </div>
        <Button onClick={saveSettings}>Save Settings</Button>
      </div>

      {successMessage && (
        <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="settings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="settings">Security Settings</TabsTrigger>
          <TabsTrigger value="logs">Security Logs</TabsTrigger>
          <TabsTrigger value="blocked">Blocked IPs</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Authentication Settings
              </CardTitle>
              <CardDescription>Configure user authentication and password policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={securitySettings.authentication.twoFactorAuth}
                  onCheckedChange={(checked) => handleInputChange("authentication", "twoFactorAuth", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="passwordComplexity">Password Complexity</Label>
                <Select
                  value={securitySettings.authentication.passwordComplexity}
                  onValueChange={(value) => handleInputChange("authentication", "passwordComplexity", value)}
                >
                  <SelectTrigger id="passwordComplexity">
                    <SelectValue placeholder="Select complexity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (8+ characters)</SelectItem>
                    <SelectItem value="medium">Medium (8+ chars, mixed case, numbers)</SelectItem>
                    <SelectItem value="high">High (12+ chars, mixed case, numbers, symbols)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={securitySettings.authentication.sessionTimeout}
                    onChange={(e) => handleInputChange("authentication", "sessionTimeout", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={securitySettings.authentication.maxLoginAttempts}
                    onChange={(e) => handleInputChange("authentication", "maxLoginAttempts", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                <Input
                  id="passwordExpiry"
                  type="number"
                  value={securitySettings.authentication.passwordExpiry}
                  onChange={(e) => handleInputChange("authentication", "passwordExpiry", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Number of days before users are required to change their password (0 = never)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy Settings
              </CardTitle>
              <CardDescription>Configure data privacy and retention policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dataRetention">Data Retention Period (days)</Label>
                <Input
                  id="dataRetention"
                  type="number"
                  value={securitySettings.privacy.dataRetention}
                  onChange={(e) => handleInputChange("privacy", "dataRetention", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Number of days to retain user data after account deletion (0 = indefinitely)
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="userDataExport">Allow User Data Export</Label>
                  <p className="text-sm text-muted-foreground">Users can export their personal data</p>
                </div>
                <Switch
                  id="userDataExport"
                  checked={securitySettings.privacy.userDataExport}
                  onCheckedChange={(checked) => handleInputChange("privacy", "userDataExport", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="anonymizeDeletedUsers">Anonymize Deleted Users</Label>
                  <p className="text-sm text-muted-foreground">
                    Replace personal information with anonymous data on deletion
                  </p>
                </div>
                <Switch
                  id="anonymizeDeletedUsers"
                  checked={securitySettings.privacy.anonymizeDeletedUsers}
                  onCheckedChange={(checked) => handleInputChange("privacy", "anonymizeDeletedUsers", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cookieConsent">Require Cookie Consent</Label>
                  <p className="text-sm text-muted-foreground">Show cookie consent banner to all users</p>
                </div>
                <Switch
                  id="cookieConsent"
                  checked={securitySettings.privacy.cookieConsent}
                  onCheckedChange={(checked) => handleInputChange("privacy", "cookieConsent", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="privacyPolicyVersion">Privacy Policy Version</Label>
                <Input
                  id="privacyPolicyVersion"
                  value={securitySettings.privacy.privacyPolicyVersion}
                  onChange={(e) => handleInputChange("privacy", "privacyPolicyVersion", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Security
              </CardTitle>
              <CardDescription>Configure API access and rate limiting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rateLimit">API Rate Limit (requests per minute)</Label>
                <Input
                  id="rateLimit"
                  type="number"
                  value={securitySettings.api.rateLimit}
                  onChange={(e) => handleInputChange("api", "rateLimit", e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="requireApiKeys">Require API Keys</Label>
                  <p className="text-sm text-muted-foreground">All API requests must include a valid API key</p>
                </div>
                <Switch
                  id="requireApiKeys"
                  checked={securitySettings.api.requireApiKeys}
                  onCheckedChange={(checked) => handleInputChange("api", "requireApiKeys", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="logApiRequests">Log API Requests</Label>
                  <p className="text-sm text-muted-foreground">Keep detailed logs of all API requests</p>
                </div>
                <Switch
                  id="logApiRequests"
                  checked={securitySettings.api.logApiRequests}
                  onCheckedChange={(checked) => handleInputChange("api", "logApiRequests", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allowCors">Allow CORS</Label>
                  <p className="text-sm text-muted-foreground">Enable Cross-Origin Resource Sharing</p>
                </div>
                <Switch
                  id="allowCors"
                  checked={securitySettings.api.allowCors}
                  onCheckedChange={(checked) => handleInputChange("api", "allowCors", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiKeyExpiry">API Key Expiry (days)</Label>
                <Input
                  id="apiKeyExpiry"
                  type="number"
                  value={securitySettings.api.apiKeyExpiry}
                  onChange={(e) => handleInputChange("api", "apiKeyExpiry", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Number of days before API keys expire (0 = never expire)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Security Logs</CardTitle>
              <CardDescription>Recent security events and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.event}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.ip}</TableCell>
                      <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            log.severity === "high"
                              ? "destructive"
                              : log.severity === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {log.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
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

        <TabsContent value="blocked">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Blocked IP Addresses</CardTitle>
                <CardDescription>IP addresses blocked due to suspicious activity</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Blocked Since</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blockedIPs.map((ip, index) => (
                    <TableRow key={index}>
                      <TableCell>{ip.ip}</TableCell>
                      <TableCell>{ip.reason}</TableCell>
                      <TableCell>{new Date(ip.timestamp).toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Unblock
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
    </div>
  )
}
