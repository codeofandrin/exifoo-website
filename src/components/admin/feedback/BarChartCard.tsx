import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Legend,
  LegendItem,
  LegendLabel,
  LegendProgress,
  LegendValue,
  type LegendItemData
} from "@/components/charts/legend"

function byPercentageDesc(a: LegendItemData, b: LegendItemData) {
  const percentageA = a.maxValue ? a.value / a.maxValue : 0
  const percentageB = b.maxValue ? b.value / b.maxValue : 0
  return percentageB - percentageA
}

export default function BarChartCard({
  title,
  data,
  size
}: {
  title: string
  data: LegendItemData[]
  size?: string
}) {
  const sortedData = [...data].sort(byPercentageDesc)

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
      <CardContent>
        <Legend items={sortedData}>
          <LegendItem className="flex flex-col gap-2 px-2 py-3" noHover>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <LegendLabel />
              </div>
              <LegendValue showPercentage />
            </div>
            <LegendProgress />
          </LegendItem>
        </Legend>
      </CardContent>
    </Card>
  )
}
