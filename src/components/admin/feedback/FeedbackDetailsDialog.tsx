import { type ReactNode } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { type FeedbackDataType } from "@/utils/server/neon"
import { USAGE_FREQUENCY_OPTIONS, PRO_FEATURES_OPTIONS, FAIR_PRICE_OPTIONS } from "@/lib/feedback/data-maps"

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" })

function labelFor(options: { value: string; label: string }[], value: string): string {
  return options.find((option) => option.value === value)?.label ?? value
}

function orNoAnswer(value: string | null): string {
  const trimmed = value?.trim()
  return !trimmed || trimmed === "-" ? "—" : trimmed
}

function Row({
  label,
  children,
  withBorder = true
}: {
  label: string
  children: ReactNode
  withBorder?: boolean
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 py-2 text-[13px]",
        withBorder && "border-b border-neutral-100"
      )}>
      <span className="shrink-0 text-neutral-500">{label}</span>
      <span className="min-w-0 text-right font-medium text-neutral-900">{children}</span>
    </div>
  )
}

function SubRow({ label, value, withBorder }: { label: string; value: string; withBorder: boolean }) {
  return (
    <div
      className={cn(
        "ml-0.5 flex items-center justify-between gap-4 py-1.5 pl-4 text-[13px]",
        withBorder && "mb-0.5 border-b border-neutral-100"
      )}>
      <span className="shrink-0 text-neutral-500">{label}</span>
      <span className="min-w-0 text-right text-neutral-900">{value}</span>
    </div>
  )
}

function FeedbackCard({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="rounded-lg bg-neutral-100 p-3 text-[13px] leading-[1.5] text-neutral-900">
      <div className="mb-1.5 font-medium text-neutral-500">{label}</div>
      {orNoAnswer(value)}
    </div>
  )
}

export default function FeedbackDetailsDialog({
  feedback,
  open,
  onOpenChange
}: {
  feedback: FeedbackDataType | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const displayName = feedback ? feedback.userName : ""

  const proFeatureSubRows: { label: string; value: string }[] = []
  if (feedback?.proFeaturesMoreFormats?.trim()) {
    proFeatureSubRows.push({ label: "More formats requested", value: feedback.proFeaturesMoreFormats.trim() })
  }
  if (feedback?.proFeaturesOther?.trim()) {
    proFeatureSubRows.push({ label: "Other", value: feedback.proFeaturesOther.trim() })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[750px] gap-0 overflow-y-auto rounded-[10px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] ring-neutral-200 sm:max-w-3xl">
        {feedback && (
          <>
            <DialogHeader className="gap-1.5">
              <DialogTitle className="text-base font-semibold text-neutral-900">{displayName}</DialogTitle>
              <DialogDescription className="text-neutral-500">
                Submitted {DATE_FORMAT.format(feedback.createdAt)}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-[18px] flex flex-col">
              <Row label="Name">{displayName}</Row>
              <Row label="Email">{feedback.userEmail}</Row>

              <Row label="Usage frequency">
                <Badge className="bg-(--chart-1)/20 text-[color-mix(in_oklch,var(--chart-1),black_35%)]">
                  {labelFor(USAGE_FREQUENCY_OPTIONS, feedback.usageFrequency)}
                </Badge>
              </Row>

              <Row label="Pro features" withBorder={proFeatureSubRows.length === 0}>
                {feedback.proFeatures.length > 0 ? (
                  <span className="flex flex-col items-end justify-center gap-1.5">
                    {feedback.proFeatures.map((value) => (
                      <Badge
                        key={value}
                        className="bg-(--chart-3)/20 text-[color-mix(in_oklch,var(--chart-3),black_35%)]">
                        {labelFor(PRO_FEATURES_OPTIONS, value)}
                      </Badge>
                    ))}
                  </span>
                ) : (
                  <span className="font-normal text-neutral-400">—</span>
                )}
              </Row>

              {proFeatureSubRows.map((sub, index) => (
                <SubRow
                  key={sub.label}
                  label={sub.label}
                  value={sub.value}
                  withBorder={index === proFeatureSubRows.length - 1}
                />
              ))}

              <Row label="Fair price">
                <Badge className="bg-(--chart-2)/20 text-[color-mix(in_oklch,var(--chart-2),black_35%)]">
                  {labelFor(FAIR_PRICE_OPTIONS, feedback.fairPrice)}
                </Badge>
              </Row>

              <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <FeedbackCard
                  label="A missing feature, a bug, or anything else? (optional)"
                  value={feedback.missingOrInconvenient}
                />
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
