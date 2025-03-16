import Button from "../common/Button"
import CTAButton from "../common/CTAButton"
import { Checkout } from "@/utils/constants"
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
  let card
  if (theme === "primary") {
    cardClasses = "bg-neutral-800 shadow-apple"
    card = (
      <div
        className={`${cardClasses} ${!first && "mt-14 md:ml-14 md:mt-0 lg:ml-24"} relative w-full rounded-2xl p-8 sm:max-w-md`}>
        <div className="absolute inset-0 bg-[radial-gradient(70%_200px_at_50%_0%,theme(backgroundColor.white/10%),transparent)]" />
        {children}
      </div>
    )
  } else if (theme === "accent") {
    cardClasses = "border border-neutral-400"
    card = (
      <div
        className={`${cardClasses} ${!first && "mt-14 sm:ml-28 sm:mt-0"} w-full rounded-2xl p-8 sm:max-w-md`}>
        {children}
      </div>
    )
  }

  return card
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
      <h2 className={`${versionClasses} sm:text-lg`}>{version}</h2>
      <h1 className={`${priceClasses} mt-3 text-4xl sm:mt-5 sm:text-5xl`}>{price}</h1>
      <h3 className={`${descClasses} mt-4 text-sm sm:mt-6 sm:text-base`}>{description}</h3>
      <div className={`${dividerClasses} mb-8 mt-7 h-px sm:mb-10 sm:mt-9`} />
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
            <p className={`${textColor} ml-3 text-sm sm:text-base`}>{text}</p>
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
    btn = (
      <CTAButton href={Checkout.checkoutURL} target="_blank" className="w-full text-sm sm:text-base">
        Get a license
      </CTAButton>
    )
  } else if (theme === "accent") {
    btn = (
      <Button
        className="w-full rounded-full border-neutral-400 bg-transparent hover:bg-neutral-200"
        color="silent"
        href="/download"
        size="2xl">
        <p className="text-sm sm:text-base">Start for free</p>
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
    <div className="mt-52 flex w-full flex-col items-center bg-neutral-100 px-7 pb-40 pt-28 sm:pt-36">
      <div id="pricing" className="w-full scroll-mt-32 sm:max-w-screen-xl">
        {/* Header */}
        <h1 className="text-center text-3xl font-semibold text-neutral-800 sm:text-4xl">
          <div className="flex flex-col sm:block">
            Pay once. <span className="font-bold text-accent-500">Use forever.</span>
          </div>
        </h1>
        {/* Description */}
        <h2 className="mt-3 text-center text-neutral-600 sm:mt-5 sm:text-lg">
          <span className="font-logo font-bold text-logo">exifoo</span> is a one-time purchase with no
          recurring fees. You can try it out for free, with the demo version.
        </h2>
        {/* Cards */}
        <div className="mt-16 flex flex-col items-center sm:mt-28 md:flex-row md:justify-center">
          {/* Demo */}
          <Card theme="accent" first>
            <CardTop
              theme="accent"
              version="Demo Version"
              price="$0"
              description={
                <>
                  <span className="font-logo text-base font-medium sm:text-lg">exifoo</span> desktop app with
                  limited features
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
                  $9.99 <span className="font-base ml-1 text-xs font-normal sm:text-base">/lifetime</span>
                </>
              }
              description={
                <>
                  <span className="font-logo text-base font-medium sm:text-lg">exifoo</span> desktop app with
                  all features
                </>
              }
            />
            <CardFeatures theme="primary" features={licenseFeatures} />
            <CardButton theme="primary" />
          </Card>
        </div>
      </div>
    </div>
  )
}
