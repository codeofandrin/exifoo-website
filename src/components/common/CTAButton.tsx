import SVGArrowRight from "@/assets/icons/ArrowRight.svg"
import "@/styles/root/CTAButton.css"

interface CTAButtonPropsType
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: string
}

export default function CTAButton({ children, ...props }: CTAButtonPropsType) {
  return (
    <button
      {...props}
      className={`${props.className} btn-cta group relative w-full overflow-hidden rounded-full bg-gradient-to-t from-primary-600 to-primary-500 px-7 py-3.5 transition`}>
      <div className="flex items-center justify-center">
        <p className="font-bold text-white">{children}</p>
        <SVGArrowRight className="ml-2 w-6 text-white transition-[transform] duration-300 group-hover:translate-x-2" />
      </div>
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
        <div className="relative h-full w-8 bg-white/20"></div>
      </div>
    </button>
  )
}
