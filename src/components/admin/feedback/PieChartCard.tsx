"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart } from "@/components/charts/pie-chart"
import { PieSlice } from "@/components/charts/pie-slice"
import { PieCenter } from "@/components/charts/pie-center"
import {
  Legend,
  LegendItem,
  LegendLabel,
  LegendMarker,
  LegendValue,
  type LegendItemData
} from "@/components/charts/legend"

export default function PieChartCard({
  title,
  data,
  size
}: {
  title: string
  data: LegendItemData[]
  size?: string
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  let maxSize = "max-w-sm"
  switch (size) {
    case "sm":
      maxSize = "max-w-sm"
      break

    case "md":
      maxSize = "max-w-md"
      break

    case "lg":
      maxSize = "max-w-lg"
      break

    case "xl":
      maxSize = "max-w-xl"
      break

    case "2xl":
      maxSize = "max-w-2xl"
      break

    case "3xl":
      maxSize = "max-w-3xl"
      break

    case "2-card":
      // Matches the combined width of two default-sized (max-w-sm) cards plus the gap-5
      // used between them, so a full-width chart card lines up exactly with a row above it.
      maxSize = "max-w-[calc(24rem*2+1.25rem)]"
      break
  }

  return (
    <Card className={`w-full ${maxSize}`}>
      <CardHeader>
        <CardTitle className="text-sm font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row items-center gap-6">
        <PieChart
          data={data}
          hoveredIndex={hoveredIndex}
          innerRadius={100}
          onHoverChange={setHoveredIndex}
          size={300}
          startAngle={0}
          endAngle={Math.PI * 2}>
          {data.map((item, index) => (
            <PieSlice index={index} key={item.label} noCursorPointer />
          ))}
          <PieCenter />
        </PieChart>
        <Legend
          className="min-w-0 flex-1"
          hoveredIndex={hoveredIndex}
          items={data}
          onHoverChange={setHoveredIndex}>
          <LegendItem className="flex cursor-default items-center justify-between gap-3 px-2 py-1">
            <span className="flex min-w-0 items-center gap-2">
              <LegendMarker />
              <LegendLabel className="truncate text-sm font-medium" />
            </span>
            <LegendValue />
          </LegendItem>
        </Legend>
      </CardContent>
    </Card>
  )
}
