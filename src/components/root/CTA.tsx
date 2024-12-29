import CTAButton from "../common/CTAButton"

import "@/styles/root/CTA.css"

interface EllipsePropsType {
  className: string
}

function Ellipse({ className }: EllipsePropsType) {
  return <div className={`${className} absolute -z-[99] rounded-full bg-primary-500 blur-[100px]`} />
}

export function Background() {
  return (
    <>
      <Ellipse className="-right-40 -top-10 h-52 w-52" />
      <Ellipse className="-bottom-10 -left-10 h-40 w-40" />
    </>
  )
}

export default function CTA() {
  return (
    <div className="relative mt-20 overflow-hidden">
      <div className="flex flex-col items-center justify-center px-7 py-20">
        {/* Text */}
        <div id="cta-text" className="text-center text-4xl font-bold">
          <p>Ready?</p>
          <p>Start organizing today!</p>
        </div>
        {/* Button */}
        <div className="mt-16 w-full">
          <CTAButton className="w-full">Download for free</CTAButton>
        </div>
      </div>
      <Background />
    </div>
  )
}
