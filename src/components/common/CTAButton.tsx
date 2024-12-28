import SVGArrowRight from "@/assets/icons/ArrowRight.svg"

export default function CTAButton({
  ...props
}: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="group relative inline-block w-full cursor-pointer rounded-full bg-primary-700 p-px no-underline">
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,255,255,0.5)_0%,rgba(56,189,248,0)_30%)] to-primary-700" />
      </span>
      <div className="relative z-10 flex items-center justify-center rounded-full bg-gradient-to-t from-primary-700 to-primary-500 px-7 py-3.5 ring-[0.8px] ring-black/10">
        <p className="font-bold text-white">Download for free</p>
        <SVGArrowRight className="ml-2 w-6 text-white transition-[transform] duration-300 group-hover:translate-x-2" />
      </div>
      <span className="absolute -bottom-0 left-[1.7rem] h-px w-[calc(100%-3.4rem)] bg-gradient-to-r from-primary-700 via-black/40 to-primary-700" />
    </button>
  )
}
