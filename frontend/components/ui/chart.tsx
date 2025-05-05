import type React from "react"

export const LineChart = ({ children, data, margin }: { children: React.ReactNode; data: any; margin: any }) => {
  return <div>{children}</div>
}

export const Line = ({
  type,
  dataKey,
  stroke,
  activeDot,
}: { type: any; dataKey: any; stroke: any; activeDot: any }) => {
  return <div></div>
}

export const XAxis = ({ dataKey }: { dataKey: any }) => {
  return <div></div>
}

export const YAxis = () => {
  return <div></div>
}

export const CartesianGrid = ({ strokeDasharray }: { strokeDasharray: any }) => {
  return <div></div>
}

export const Tooltip = () => {
  return <div></div>
}

export const Legend = () => {
  return <div></div>
}

export const ResponsiveContainer = ({
  children,
  width,
  height,
}: { children: React.ReactNode; width: any; height: any }) => {
  return <div>{children}</div>
}
