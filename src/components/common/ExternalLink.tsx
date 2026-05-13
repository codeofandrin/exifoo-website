import SVGExternalLink from "@/assets/icons/ExternalLink.svg"

interface ExternalLinkPropsType {
  children?: any
  href: string
  className?: string
  title?: string
  displayIcon?: boolean
  color?: string
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>
  onFocus?: React.FocusEventHandler<HTMLAnchorElement>
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export default function ExternalLink({
  children,
  href,
  className,
  title,
  displayIcon = false,
  color = "primary",
  onMouseEnter,
  onFocus,
  onClick
}: ExternalLinkPropsType) {
  let styleClasses
  switch (color) {
    case "primary":
      styleClasses = "text-primary-500 hover:text-primary-700 underline"
      break
    case "primary-no-underline":
      styleClasses = "text-primary-500 hover:text-primary-700"
      break
    case "silent":
      styleClasses = "underline decoration-transparent hover:decoration-inherit"
      break
    case "underline":
      styleClasses = "underline"
      break
  }

  return (
    <a
      href={href}
      target="_blank"
      className={`${className} ${styleClasses} transition-colors duration-200`}
      title={title}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      onClick={onClick}>
      {displayIcon ? (
        <div className="flex items-center">
          {children}
          <SVGExternalLink className="ml-1 w-3" />
        </div>
      ) : (
        <>{children}</>
      )}
    </a>
  )
}
