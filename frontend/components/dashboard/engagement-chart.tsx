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

export function EngagementChart() {
  // This would normally be fetched from your API
  const data = [
    { name: "Jan", views: 4000, likes: 2400, comments: 400 },
    { name: "Feb", views: 3000, likes: 1398, comments: 210 },
    { name: "Mar", views: 2000, likes: 9800, comments: 290 },
    { name: "Apr", views: 2780, likes: 3908, comments: 320 },
    { name: "May", views: 1890, likes: 4800, comments: 181 },
    { name: "Jun", views: 2390, likes: 3800, comments: 250 },
    { name: "Jul", views: 3490, likes: 4300, comments: 210 },
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
        <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="likes" stroke="#82ca9d" />
        <Line type="monotone" dataKey="comments" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  )
}
