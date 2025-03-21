import type { Metadata } from "next"

import MarkdownContent from "@/components/common/MarkdownContent"
import { extractMarkdownMetaData } from "@/utils/helpers"

import { getReleaseNotes } from "@/utils/server/github"

export const metadata: Metadata = {
  title: "Release Notes - exifoo",
  description: "Latest changes of the exifoo desktop app."
}

export default async function ReleaseNotes() {
  const markdownFiles: string[] = await getReleaseNotes()

  return (
    <div className="flex flex-col items-center">
      <div className="mt-24 w-full px-7 sm:mt-32 sm:max-w-screen-xl">
        <h1 className="pb-6 font-logo text-3xl font-bold tracking-tight text-neutral-800 sm:text-4xl">
          Release Notes
        </h1>
        {markdownFiles.map((content: string, i: number) => {
          const [rawMetaData, metaData] = extractMarkdownMetaData(content)
          content = content.replace(rawMetaData[0], "")
          const date = metaData.date
          const isLast = i === markdownFiles.length - 1

          return (
            <div key={`release-notes-item-${i}`}>
              {/* Mobile view */}
              <div className="mt-14 flex flex-col sm:hidden">
                <h3 className="text-sm font-medium text-primary-400">{date}</h3>
                <div className={`${isLast ? "pb-5" : "pb-3"} mt-5`}>
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
                <div className="mt-8 pb-9">
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
