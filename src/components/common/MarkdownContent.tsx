import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"

import { EMail } from "@/utils/constants"
import ExternalLink from "@/components/common/ExternalLink"
import "@/styles/Markdown.css"

interface MarkdownContentPropsType {
  children: string
}

export default function MarkdownContent({ children }: MarkdownContentPropsType) {
  return (
    <Markdown
      className="content"
      rehypePlugins={[rehypeRaw]}
      components={{
        a(props) {
          const replaceList = [{ from: "$email-info", to: EMail.info }]

          let content = (props.children as string) || ""
          let href = props.href || ""
          for (let i = 0; i < replaceList.length; i++) {
            const replacePair = replaceList[i]
            content = content.replaceAll(replacePair.from, replacePair.to)
            href = href.replaceAll(replacePair.from, replacePair.to)
          }

          return (
            <ExternalLink href={href} color="primary-no-underline">
              {content}
            </ExternalLink>
          )
        }
      }}>
      {children}
    </Markdown>
  )
}
