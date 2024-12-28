import Button from "../common/Button"
import CTAButton from "../common/CTAButton"
import SVGCheck from "@/assets/icons/Check.svg"
import SVGX from "@/assets/icons/X.svg"

interface CardPropsType {
  className?: string
  children: React.ReactElement[] | React.ReactElement
  theme: string
  first?: boolean
}

function Card({ children, theme, first = false }: CardPropsType) {
  let cardClasses = ""
  if (theme === "primary") {
    cardClasses = "bg-neutral-800 shadow-apple"
  } else if (theme === "accent") {
    cardClasses = "border border-neutral-400"
  }

  return <div className={`${cardClasses} ${!first && "mt-14"} rounded-2xl p-8`}>{children}</div>
}

interface CardTopPropsType {
  version: React.ReactElement | string
  price: React.ReactElement | string
  description: React.ReactElement | string
  theme: string
}

function CardTop({ version, price, description, theme }: CardTopPropsType) {
  let versionClasses = ""
  let priceClasses = ""
  let descClasses = ""
  let dividerClasses = ""
  if (theme === "primary") {
    versionClasses = "text-primary-300 font-semibold"
    priceClasses = "text-white font-bold"
    descClasses = "text-neutral-400"
    dividerClasses = "bg-primary-100"
  } else if (theme === "accent") {
    versionClasses = "text-accent-500/60"
    priceClasses = "text-neutral-800"
    descClasses = "text-neutral-500"
    dividerClasses = "bg-neutral-400"
  }

  return (
    <div>
      <h2 className={`${versionClasses} text-lg`}>{version}</h2>
      <h1 className={`${priceClasses} mt-1 text-4xl`}>{price}</h1>
      <div className={`${descClasses} mt-4 text-sm`}>{description}</div>
      <div className={`${dividerClasses} mb-8 mt-7 h-px`} />
    </div>
  )
}

interface CardFeaturesPropsType {
  theme: string
  features: { text: string; active: boolean }[]
}

function CardFeatures({ theme, features }: CardFeaturesPropsType) {
  let activeCircleClasses = ""
  let activeTextClasses = ""
  if (theme === "primary") {
    activeCircleClasses = "bg-primary-500"
    activeTextClasses = "text-white font-semibold"
  } else if (theme === "accent") {
    activeCircleClasses = "bg-accent-500/60"
    activeTextClasses = "text-neutral-600"
  }

  return (
    <div>
      {features.map(({ text, active }, i) => {
        const circleBgColor = active ? activeCircleClasses : "bg-neutral-300"
        const textColor = active ? activeTextClasses : "text-neutral-300"

        return (
          <div key={i} className="mt-3 flex items-center">
            <div className={`${circleBgColor} rounded-full p-1`}>
              {active ? (
                <SVGCheck className="h-3 w-3 stroke-[3] text-white" />
              ) : (
                <SVGX className="h-3 w-3 stroke-[3] text-white" />
              )}
            </div>
            <p className={`${textColor} ml-3 text-sm`}>{text}</p>
          </div>
        )
      })}
    </div>
  )
}

interface CardButtonPropsType {
  theme: string
}

function CardButton({ theme }: CardButtonPropsType) {
  let btn = <></>
  if (theme === "primary") {
    btn = <CTAButton className="text-sm">Get a license</CTAButton>
  } else if (theme === "accent") {
    btn = (
      <Button className="w-full rounded-full bg-transparent" color="silent" size="lg">
        <p className="text-sm">Start for free</p>
      </Button>
    )
  }

  return <div className="mt-10">{btn}</div>
}

export default function Pricing() {
  const licenseFeatures = [
    { text: "No registration required", active: true },
    { text: "Clean and modern design", active: true },
    { text: "Lifetime updates", active: true },
    { text: "Premium support", active: true },
    { text: "Unlimited photos", active: true }
  ]
  const demoFeatures = structuredClone(licenseFeatures)
  demoFeatures[4].active = false

  return (
    <div className="mt-52 bg-neutral-100 px-7 pb-40 pt-28">
      {/* Header */}
      <h1 className="text-center text-3xl font-semibold text-neutral-800">
        <p>Pay once</p>
        <p className="font-bold text-accent-500">Use forever.</p>
      </h1>
      {/* Description */}
      <p className="mt-3 text-center text-neutral-600">
        <span className="font-logo font-bold text-logo">exifoo</span> is a one-time purchase with no recurring
        fees. You can try it out for free, with the demo version.
      </p>
      {/* Cards */}
      <div className="mt-16">
        {/* Demo */}
        <Card theme="accent" first>
          <CardTop
            theme="accent"
            version="Demo Version"
            price="$0"
            description={
              <>
                <span className="font-logo text-base font-medium">exifoo</span> desktop app with limited
                features
              </>
            }
          />
          <CardFeatures theme="accent" features={demoFeatures} />
          <CardButton theme="accent" />
        </Card>
        {/* License */}
        <Card theme="primary">
          <CardTop
            theme="primary"
            version="Full Version"
            price={
              <>
                $19 <span className="font-base ml-1 text-xs font-normal">/lifetime</span>
              </>
            }
            description={
              <>
                <span className="font-logo text-base font-medium">exifoo</span> desktop app with all features
              </>
            }
          />
          <CardFeatures theme="primary" features={licenseFeatures} />
          <CardButton theme="primary" />
        </Card>
      </div>
    </div>
  )
}
