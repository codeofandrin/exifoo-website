import CTAButton from "../common/CTAButton"

import "@/styles/root/CTA.css"

interface EllipsePropsType {
  className: string
}

function Ellipse({ className }: EllipsePropsType) {
  return <div className={`${className} absolute -z-[99] rounded-full bg-primary-500 blur-[150px]`} />
}

export function Background() {
  return (
    <>
      <Ellipse className="-right-40 -top-10 h-52 w-52 sm:-right-28 sm:-top-28 sm:h-60 sm:w-60 md:right-28 lg:right-60" />
      <Ellipse className="-bottom-10 -left-10 h-40 w-40 sm:left-10 sm:h-52 sm:w-52" />
    </>
  )
}

export default function CTA() {
  return (
    <div className="relative mt-20 w-full overflow-hidden">
      <div className="flex flex-col items-center justify-center px-7 py-20">
        {/* Text */}
        <div className="cta-text sm:cta-text-sm p-1 text-center font-logo text-4xl font-bold tracking-tight sm:text-6xl">
          <p>Ready?</p>
          <p className="mt-1 sm:mt-3">Start organizing today!</p>
        </div>
        {/* Button */}
        <div className="mt-16 flex w-full justify-center sm:mt-20">
          <CTAButton className="w-full sm:w-72">Download for free</CTAButton>
        </div>
      </div>
      <Background />
    </div>
  )
}
