import { getAllFeedbacks, type FeedbackDataType } from "@/utils/server/neon"
import ResponsesTable from "@/components/admin/feedback/ResponsesTable"
import DefaultCard from "@/components/admin/feedback/DefaultCard"
import BarChartCard from "@/components/admin/feedback/BarChartCard"
// import { DUMMY_FEEDBACKS } from "@/components/admin/feedback/dummy-feedbacks"
import { type LegendItemData } from "@/components/charts/legend"
import { USAGE_FREQUENCY_OPTIONS, PRO_FEATURES_OPTIONS, FAIR_PRICE_OPTIONS } from "@/lib/feedback/data-maps"

function getPayForProPercentage(feedbacks: FeedbackDataType[]): number {
  const totalAmount = feedbacks.length
  const noPayAmount = feedbacks.filter((f) => f.fairPrice === "no_pay").length

  return ((totalAmount - noPayAmount) / totalAmount) * 100
}

function getMostUsage(feedbacks: FeedbackDataType[]): string[] {
  let maxCount = 0
  let mostValues: string[] = []
  USAGE_FREQUENCY_OPTIONS.forEach(({ value, label }) => {
    const count = feedbacks.filter((f) => f.usageFrequency === value).length

    if (count > maxCount) {
      maxCount = count
      mostValues = [label]
    } else if (count === maxCount && count > 0) {
      mostValues.push(label)
    }
  })

  return mostValues
}

function getTopFeatureRequest(feedbacks: FeedbackDataType[]): string[] {
  let maxCount = 0
  let mostValues: string[] = []
  PRO_FEATURES_OPTIONS.forEach(({ value, label }) => {
    const count = feedbacks.filter((f) => f.proFeatures.includes(value)).length

    if (count > maxCount) {
      maxCount = count
      mostValues = [label]
    } else if (count === maxCount && count > 0) {
      mostValues.push(label)
    }
  })

  return mostValues
}

function getUsageFrequencyData(feedbacks: FeedbackDataType[]): LegendItemData[] {
  return USAGE_FREQUENCY_OPTIONS.map(({ value, label }) => ({
    label,
    value: feedbacks.filter((f) => f.usageFrequency === value).length,
    maxValue: feedbacks.length,
    color: "var(--chart-1)"
  }))
}

function getMostRequestedProData(feedbacks: FeedbackDataType[]): LegendItemData[] {
  return PRO_FEATURES_OPTIONS.map(({ value, label }) => ({
    label,
    value: feedbacks.filter((f) => f.proFeatures.includes(value)).length,
    maxValue: feedbacks.length,
    color: "var(--chart-3)"
  }))
}

function getFairPriceData(feedbacks: FeedbackDataType[]): LegendItemData[] {
  return FAIR_PRICE_OPTIONS.map(({ value, label }) => ({
    label,
    value: feedbacks.filter((f) => f.fairPrice === value).length,
    maxValue: feedbacks.length,
    color: "var(--chart-2)"
  }))
}

export default async function FeedbackPage() {
  const fetchedFeedbacks = await getAllFeedbacks()
  const feedbacks: FeedbackDataType[] = fetchedFeedbacks
  // const feedbacks: FeedbackDataType[] = DUMMY_FEEDBACKS

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-wrap gap-5">
        <DefaultCard title="Total responses" primaryText={feedbacks.length} />
        <DefaultCard
          title="Would pay for Pro"
          primaryText={feedbacks.length ? `${getPayForProPercentage(feedbacks).toFixed(0)}%` : "-"}
        />
        <DefaultCard
          title="Most common usage"
          primaryText={feedbacks.length ? getMostUsage(feedbacks).join(", ") : "-"}
        />
        <DefaultCard
          title="Top feature request"
          primaryText={getTopFeatureRequest(feedbacks).join(", ") || "-"}
        />
      </div>
      <div className="flex flex-wrap gap-5">
        <BarChartCard title="Usage frequency" data={getUsageFrequencyData(feedbacks)} />
        <BarChartCard title="Fair price for Pro" data={getFairPriceData(feedbacks)} />
        <BarChartCard
          title="Most requested Pro features"
          data={getMostRequestedProData(feedbacks)}
          size="2-card"
        />
      </div>
      <ResponsesTable feedbacks={feedbacks} />
    </div>
  )
}
