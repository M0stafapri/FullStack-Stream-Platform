"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "@/components/ui/chart"

export function AdminContentStats() {
  // This would normally be fetched from your API
  const data = [
    { name: "Jan", videos: 250, users: 1200, reports: 12 },
    { name: "Feb", videos: 320, users: 1400, reports: 18 },
    { name: "Mar", videos: 380, users: 1600, reports: 24 },
    { name: "Apr", videos: 450, users: 1900, reports: 28 },
    { name: "May", videos: 520, users: 2200, reports: 32 },
    { name: "Jun", videos: 600, users: 2500, reports: 26 },
    { name: "Jul", videos: 680, users: 2800, reports: 30 },
  ]

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="videos" stroke="#82ca9d" />
        <Line type="monotone" dataKey="reports" stroke="#ff7300" />
      </LineChart>
    </ResponsiveContainer>
  )
}
