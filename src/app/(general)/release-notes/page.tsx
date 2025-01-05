import MarkdownContent from "@/components/common/MarkdownContent"
import { extractMetaData } from "@/utils/helpers"
import "@/styles/Markdown.css"

export default function ReleaseNotes() {
  const importAllFiles = (r: any) => r.keys().map(r)
  const markdownFiles = importAllFiles(require.context("../../../content/release-notes", false, /\.md$/))
    .sort()
    .reverse()

  console.log(markdownFiles)

  return (
    <div className="flex flex-col items-center">
      <div className="mt-10 w-full px-7 sm:mt-20 sm:max-w-screen-xl">
        <h1 className="mt-14 pb-6 font-logo text-4xl font-bold tracking-tight text-neutral-800">
          Release Notes
        </h1>
        {markdownFiles.map((release: { default: string }, i: number) => {
          let content = release.default
          const [rawMetaData, metaData] = extractMetaData(content)
          content = content.replace(rawMetaData[0], "")
          const date = metaData.date
          const isLast = i === markdownFiles.length - 1

          return (
            <div key={`release-notes-item-${i}`}>
              {/* Mobile view */}
              <div className="mt-14 flex flex-col sm:hidden">
                <p className="text-sm font-medium text-primary-400">{date}</p>
                <div className={`${isLast ? "pb-5" : "pb-3"}`}>
                  <MarkdownContent>{content}</MarkdownContent>
                </div>
              </div>
              {/* Desktop view */}
              <div className="mt-5 hidden sm:flex">
                <div className="flex flex-col items-center">
                  <p className="text-sm font-medium text-primary-400">{date}</p>
                  <div className="mt-5 h-full w-px bg-primary-200"></div>
                  {isLast && (
                    <div className="rounded-full border border-primary-200 p-1">
                      <div className="rounded-full bg-primary-200 p-[1.5px]"></div>
                    </div>
                  )}
                </div>
                <div className="pb-9">
                  <MarkdownContent>{content}</MarkdownContent>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
