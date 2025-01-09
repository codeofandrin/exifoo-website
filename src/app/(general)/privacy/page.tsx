import MarkdownContent from "@/components/common/MarkdownContent"
import MdPrivacyPolicy from "@/content/privacy/privacy-policy.md"
import "@/styles/privacy/PrivacyPolicy.css"

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-24 w-full px-7 sm:mt-32 sm:max-w-screen-xl">
        <div className="content-privacy">
          <MarkdownContent>{MdPrivacyPolicy}</MarkdownContent>
        </div>
      </div>
    </div>
  )
}
