"use client"

import { useState, useMemo } from "react"
import {
  ArrowDown,
  ArrowDown01,
  ArrowDownAZ,
  ArrowUp,
  ArrowUp01,
  ArrowUpAZ,
  ArrowUpDown,
  CalendarArrowDown,
  CalendarArrowUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { type FeedbackDataType } from "@/utils/server/neon"
import { useFeedbackReadState } from "@/hooks/use-feedback-read-state"
import FeedbackDetailsDialog from "@/components/admin/feedback/FeedbackDetailsDialog"
import { FacetedFilter } from "@/components/admin/feedback/FacetedFilter"
import { cn } from "@/lib/utils"
import {
  USAGE_FREQUENCY_OPTIONS,
  PRO_FEATURES_OPTIONS,
  FAIR_PRICE_OPTIONS,
  TESTIMONIAL_CONSENT_OPTIONS,
  TESTIMONIAL_CONSENT_COLORS
} from "@/lib/feedback/data-maps"

type FacetKey = "usageFrequency" | "proFeatures" | "fairPrice" | "testimonialConsent"

const FACET_FILTERS: { key: FacetKey; label: string; options: { value: string; label: string }[] }[] = [
  { key: "usageFrequency", label: "Usage Frequency", options: USAGE_FREQUENCY_OPTIONS },
  { key: "proFeatures", label: "Pro Features", options: PRO_FEATURES_OPTIONS },
  { key: "fairPrice", label: "Fair Price", options: FAIR_PRICE_OPTIONS },
  { key: "testimonialConsent", label: "Testimonial Consent", options: TESTIMONIAL_CONSENT_OPTIONS }
]

type FacetState = Record<FacetKey, Set<string>>

const EMPTY_FACETS: FacetState = {
  usageFrequency: new Set(),
  proFeatures: new Set(),
  fairPrice: new Set(),
  testimonialConsent: new Set()
}

// A feedback matches a facet when nothing is selected, or when its value (any of
// them, for the multi-valued proFeatures) is among the selected options.
function matchesFacet(feedback: FeedbackDataType, key: FacetKey, selected: Set<string>): boolean {
  if (selected.size === 0) return true
  if (key === "proFeatures") return feedback.proFeatures.some((value) => selected.has(value))
  return selected.has(feedback[key] as string)
}

type SortKey = "name" | "email" | "usageFrequency" | "fairPrice" | "testimonialConsent" | "createdAt"
type SortDirection = "asc" | "desc"

const PAGE_SIZE_OPTIONS = [10, 20, 50]
const DEFAULT_PAGE_SIZE = 10

// Enum columns sort by their semantic order in data-maps, not alphabetically by label.
function optionIndex(options: { value: string }[], value: string): number {
  const index = options.findIndex((option) => option.value === value)
  return index === -1 ? options.length : index
}

const SORT_ACCESSORS: Record<SortKey, (feedback: FeedbackDataType) => string | number> = {
  createdAt: (feedback) => feedback.createdAt.getTime(),
  name: (feedback) => (feedback.name ?? feedback.userName ?? "").toLowerCase(),
  email: (feedback) => (feedback.userEmail ?? "").toLowerCase(),
  usageFrequency: (feedback) => optionIndex(USAGE_FREQUENCY_OPTIONS, feedback.usageFrequency),
  fairPrice: (feedback) => optionIndex(FAIR_PRICE_OPTIONS, feedback.fairPrice),
  testimonialConsent: (feedback) => optionIndex(TESTIMONIAL_CONSENT_OPTIONS, feedback.testimonialConsent)
}

type SortIconComponent = React.ComponentType<{ className?: string }>

const SORT_ICONS: Record<
  SortKey,
  { neutral: SortIconComponent; asc: SortIconComponent; desc: SortIconComponent }
> = {
  createdAt: { neutral: ArrowUpDown, asc: CalendarArrowUp, desc: CalendarArrowDown },
  name: { neutral: ArrowUpDown, asc: ArrowDownAZ, desc: ArrowUpAZ },
  email: { neutral: ArrowUpDown, asc: ArrowDownAZ, desc: ArrowUpAZ },
  usageFrequency: { neutral: ArrowUpDown, asc: ArrowUp, desc: ArrowDown },
  fairPrice: { neutral: ArrowUpDown, asc: ArrowDown01, desc: ArrowUp01 },
  testimonialConsent: { neutral: ArrowUpDown, asc: ArrowUp, desc: ArrowDown }
}

export default function ResponsesTable({ feedbacks }: { feedbacks: FeedbackDataType[] }) {
  const { isRead, markAsRead } = useFeedbackReadState()
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackDataType | null>(null)
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false)
  const [sort, setSort] = useState<{ key: SortKey; direction: SortDirection } | null>({
    key: "createdAt",
    direction: "desc"
  })
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [page, setPage] = useState(0)
  const [filter, setFilter] = useState("")
  const [facets, setFacets] = useState<FacetState>(EMPTY_FACETS)

  function setFacet(key: FacetKey, next: Set<string>) {
    setFacets((current) => ({ ...current, [key]: next }))
    setPage(0)
  }

  function handleRowClick(feedback: FeedbackDataType) {
    markAsRead(feedback.licenseKeyId)
    setSelectedFeedback(feedback)
    setIsFeedbackOpen(true)
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setIsFeedbackOpen(false)
    }
  }

  // Cycle through asc -> desc -> unsorted on repeated clicks of the same header.
  function toggleSort(key: SortKey) {
    setPage(0)
    setSort((current) => {
      if (current?.key !== key) return { key, direction: "asc" }
      if (current.direction === "asc") return { key, direction: "desc" }
      return null
    })
  }

  const textFilteredFeedbacks = useMemo(() => {
    const query = filter.trim().toLowerCase()
    if (!query) return feedbacks

    return feedbacks.filter((feedback) => {
      const name = (feedback.name ?? feedback.userName ?? "").toLowerCase()
      const email = (feedback.userEmail ?? "").toLowerCase()
      return name.includes(query) || email.includes(query)
    })
  }, [feedbacks, filter])

  const filteredFeedbacks = useMemo(
    () =>
      textFilteredFeedbacks.filter((feedback) =>
        FACET_FILTERS.every(({ key }) => matchesFacet(feedback, key, facets[key]))
      ),
    [textFilteredFeedbacks, facets]
  )

  // Per-option counts for each facet, narrowed by the text query and every OTHER
  // active facet, so a number reflects what picking that option would yield.
  const facetCounts = useMemo(() => {
    const result = {} as Record<FacetKey, Map<string, number>>
    for (const { key, options } of FACET_FILTERS) {
      const base = textFilteredFeedbacks.filter((feedback) =>
        FACET_FILTERS.every(
          ({ key: otherKey }) => otherKey === key || matchesFacet(feedback, otherKey, facets[otherKey])
        )
      )
      const counts = new Map<string, number>()
      for (const { value } of options) {
        counts.set(
          value,
          base.filter((feedback) =>
            key === "proFeatures" ? feedback.proFeatures.includes(value) : (feedback[key] as string) === value
          ).length
        )
      }
      result[key] = counts
    }
    return result
  }, [textFilteredFeedbacks, facets])

  const sortedFeedbacks = useMemo(() => {
    if (!sort) return filteredFeedbacks

    const accessor = SORT_ACCESSORS[sort.key]
    const factor = sort.direction === "asc" ? 1 : -1

    return [...filteredFeedbacks].sort((a, b) => {
      const aValue = accessor(a)
      const bValue = accessor(b)
      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * factor
      }
      return String(aValue).localeCompare(String(bValue)) * factor
    })
  }, [filteredFeedbacks, sort])

  const totalPages = Math.max(1, Math.ceil(sortedFeedbacks.length / pageSize))
  const currentPage = Math.min(page, totalPages - 1)
  const pageStart = currentPage * pageSize
  const pagedFeedbacks = sortedFeedbacks.slice(pageStart, pageStart + pageSize)

  function renderSortIcon(key: SortKey) {
    const icons = SORT_ICONS[key]
    if (sort?.key !== key) {
      const NeutralIcon = icons.neutral
      return <NeutralIcon className="size-3.5 opacity-50" />
    }
    const ActiveIcon = sort.direction === "asc" ? icons.asc : icons.desc
    return <ActiveIcon className="size-3.5" />
  }

  function sortableHead(key: SortKey, label: string) {
    return (
      <TableHead>
        <Button variant="ghost" size="sm" className="-ml-2.5 cursor-pointer" onClick={() => toggleSort(key)}>
          {label}
          {renderSortIcon(key)}
        </Button>
      </TableHead>
    )
  }

  return (
    <div>
      <h2 className="mb-2 text-sm font-bold">
        All responses{" "}
        <span className="text-muted-foreground font-normal">
          — {filteredFeedbacks.length} of {feedbacks.length}
        </span>
      </h2>
      <Card>
        <CardContent>
          <div className="flex flex-wrap items-center gap-2 pb-4">
            <Input
              placeholder="Filter by name or e-mail…"
              value={filter}
              onChange={(event) => {
                setFilter(event.target.value)
                setPage(0)
              }}
              className="max-w-sm"
            />
            {FACET_FILTERS.map(({ key, label, options }) => (
              <FacetedFilter
                key={key}
                label={label}
                options={options}
                counts={facetCounts[key]}
                selected={facets[key]}
                onChange={(next) => setFacet(key, next)}
              />
            ))}
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent!">
                {sortableHead("createdAt", "Date")}
                {sortableHead("name", "Name")}
                {sortableHead("email", "E-Mail")}
                {sortableHead("usageFrequency", "Usage Frequency")}
                <TableHead>Likes</TableHead>
                <TableHead>Missing or Inconvenient</TableHead>
                <TableHead>Pro Features</TableHead>
                {sortableHead("fairPrice", "Fair Price")}
                {sortableHead("testimonialConsent", "Testimonial Consent")}
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagedFeedbacks.length > 0 ? (
                pagedFeedbacks.map((feedback) => {
                  const isNew = !isRead(feedback.licenseKeyId)

                  const usageFrequencyLabel = USAGE_FREQUENCY_OPTIONS.filter(
                    (f) => f.value === feedback.usageFrequency
                  )[0].label
                  const proFeaturesLabels = feedback.proFeatures.map(
                    (feat) => PRO_FEATURES_OPTIONS.filter((m) => m.value === feat)[0].label
                  )
                  const fairPriceLabel = FAIR_PRICE_OPTIONS.filter((f) => f.value === feedback.fairPrice)[0]
                    .label
                  const testimonialMap = TESTIMONIAL_CONSENT_OPTIONS.filter(
                    (f) => f.value === feedback.testimonialConsent
                  )[0]
                  const testimonialLabel = testimonialMap.label
                  const testimonialColor = TESTIMONIAL_CONSENT_COLORS[testimonialMap.value]

                  return (
                    <TableRow
                      key={feedback.licenseKeyId}
                      onClick={() => handleRowClick(feedback)}
                      className={cn("cursor-pointer", isNew && "bg-accent/60 font-semibold")}>
                      <TableCell>
                        <span className="flex items-center justify-start gap-2">
                          {isNew && (
                            <>
                              <span className="bg-destructive relative inline-flex size-1.5 rounded-full" />
                            </>
                          )}
                          {new Intl.DateTimeFormat("de-CH", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit"
                          }).format(feedback.createdAt)}
                        </span>
                      </TableCell>
                      <TableCell>{feedback.name ?? feedback.userName}</TableCell>
                      <TableCell>{feedback.userEmail}</TableCell>
                      <TableCell>
                        <Badge className="bg-(--chart-1)/20 text-[color-mix(in_oklch,var(--chart-1),black_35%)]">
                          {usageFrequencyLabel}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-64 truncate whitespace-normal">{feedback.likes}</TableCell>
                      <TableCell className="max-w-64 truncate whitespace-normal">
                        {feedback.missingOrInconvenient}
                      </TableCell>
                      <TableCell>
                        <div className="flex h-full flex-col justify-center gap-2">
                          {proFeaturesLabels.map((pf) => (
                            <Badge
                              key={`pro-feature-${pf}`}
                              className="bg-(--chart-3)/20 text-[color-mix(in_oklch,var(--chart-3),black_35%)]">
                              {pf}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-(--chart-2)/20 text-[color-mix(in_oklch,var(--chart-2),black_35%)]">
                          {fairPriceLabel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          style={{
                            backgroundColor: `color-mix(in srgb, ${testimonialColor} 40%, transparent)`,
                            color: `color-mix(in oklch, ${testimonialColor}, black 60%)`
                          }}>
                          {testimonialLabel}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell className="text-muted-foreground" colSpan={9}>
                    No responses found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          {/* Pagination */}
          <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-4">
            <div className="text-muted-foreground text-sm">
              {sortedFeedbacks.length > 0
                ? `Showing ${pageStart + 1}–${pageStart + pagedFeedbacks.length} of ${sortedFeedbacks.length}`
                : "0 responses"}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground text-sm">Rows per page</span>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <Button
                    key={size}
                    variant={pageSize === size ? "default" : "outline"}
                    size="xs"
                    className="cursor-pointer"
                    onClick={() => {
                      setPageSize(size)
                      setPage(0)
                    }}>
                    {size}
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 0}
                  className="cursor-pointer"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}>
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages - 1}
                  className="cursor-pointer"
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
      <FeedbackDetailsDialog
        feedback={selectedFeedback}
        open={isFeedbackOpen}
        onOpenChange={handleOpenChange}
      />
    </div>
  )
}
