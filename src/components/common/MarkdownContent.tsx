"use client"

import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"

import { EmailObfuscated } from "@/utils/constants"
import ExternalLink from "@/components/common/ExternalLink"
import { useObfuscatedEmail } from "@/hooks/useObfuscatedEmail"
import "@/styles/Markdown.css"

interface MarkdownContentPropsType {
  children: string
}

export default function MarkdownContent({ children }: MarkdownContentPropsType) {
  const {
    href: infoHref,
    label: infoLabel,
    reveal: revealInfo,
    isRevealed: isInfoRevealed
  } = useObfuscatedEmail(EmailObfuscated.info)

  return (
    <Markdown
      className="content"
      rehypePlugins={[rehypeRaw]}
      components={{
        a(props) {
          const isEmailLink = props.href?.includes("$email-info")

          let content = (props.children as string) || ""
          let href = props.href || ""

          if (isEmailLink) {
            href = infoHref
            content = isInfoRevealed ? infoLabel : "[click to reveal]"
          }

          return (
            <ExternalLink
              href={href}
              color="primary-no-underline"
              onClick={isEmailLink ? revealInfo : undefined}
              className={isEmailLink && !isInfoRevealed ? "italic" : undefined}>
              {content}
            </ExternalLink>
          )
        }
      }}>
      {children}
    </Markdown>
  )
}
