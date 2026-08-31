"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { useLegend, useLegendItem } from "./legend-context"

export interface LegendItemProps {
  /** Container class name */
  className?: string
  /** Children components (LegendMarker, LegendLabel, LegendValue, LegendProgress) */
  children: ReactNode
  noHover?: boolean
}

export function LegendItem({ className = "", children, noHover = false }: LegendItemProps) {
  const { setHoveredIndex } = useLegend()
  const { index, isHovered, isFaded } = useLegendItem()

  return (
    // biome-ignore lint/a11y/noNoninteractiveElementInteractions: Legend item hover interaction
    // biome-ignore lint/a11y/noStaticElementInteractions: Legend item hover interaction
    <div
      className={cn(
        "rounded-lg px-2 py-1.5 transition-all duration-150 ease-out",
        !noHover && isHovered && "bg-legend-muted",
        !noHover && isFaded && "opacity-40",
        !noHover && "cursor-pointer",
        className
      )}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}>
      {children}
    </div>
  )
}

LegendItem.displayName = "LegendItem"
