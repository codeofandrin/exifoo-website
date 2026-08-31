import { Card, CardContent, CardHeader, CardDescription, CardFooter } from "@/components/ui/card"

export default function DefaultCard({
  title,
  primaryText,
  secondaryText
}: {
  title: string
  primaryText: string | number
  secondaryText?: string | number
}) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-3xl font-bold">{primaryText}</p>
        </div>
      </CardContent>
      <CardFooter>
        <p>{secondaryText}</p>
      </CardFooter>
    </Card>
  )
}
