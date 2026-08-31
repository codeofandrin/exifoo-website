"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

export type FacetOption = { value: string; label: string }

export function FacetedFilter({
  label,
  options,
  counts,
  selected,
  onChange
}: {
  label: string
  options: FacetOption[]
  counts: Map<string, number>
  selected: Set<string>
  onChange: (next: Set<string>) => void
}) {
  function toggle(value: string) {
    const next = new Set(selected)
    if (next.has(value)) {
      next.delete(value)
    } else {
      next.add(value)
    }
    onChange(next)
  }

  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="default" className="cursor-pointer" />}>
        {label}
        {selected.size > 0 && (
          <Badge variant="secondary" className="ml-0.5 px-1.5 tabular-nums">
            {selected.size}
          </Badge>
        )}
        <ChevronDown className="size-3.5 opacity-50" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 gap-0.5 p-1">
        {options.map((option) => (
          <label
            key={option.value}
            title={option.label}
            className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm">
            <Checkbox checked={selected.has(option.value)} onCheckedChange={() => toggle(option.value)} />
            <span className="flex-1 truncate">{option.label}</span>
            <span className="text-muted-foreground text-xs tabular-nums">
              {counts.get(option.value) ?? 0}
            </span>
          </label>
        ))}
        {selected.size > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-0.5 w-full cursor-pointer justify-center"
            onClick={() => onChange(new Set())}>
            Clear filter
          </Button>
        )}
      </PopoverContent>
    </Popover>
  )
}
