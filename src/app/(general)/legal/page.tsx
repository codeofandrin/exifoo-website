import MarkdownContent from "@/components/common/MarkdownContent"
import MdLegalNotice from "@/content/legal-notice.md"

export default function LegalNotice() {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-10 w-full px-7 sm:mt-20 sm:max-w-screen-xl">
        <MarkdownContent>{MdLegalNotice}</MarkdownContent>
      </div>
    </div>
  )
}
