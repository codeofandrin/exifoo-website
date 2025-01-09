import MarkdownContent from "@/components/common/MarkdownContent"
import MdLegalNotice from "@/content/legal/legal-notice.md"

export default function LegalNotice() {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-24 w-full px-7 sm:mt-32 sm:max-w-screen-xl">
        <MarkdownContent>{MdLegalNotice}</MarkdownContent>
      </div>
    </div>
  )
}
