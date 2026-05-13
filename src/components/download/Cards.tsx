"use client"

import ExternalLink from "../common/ExternalLink"
import { EmailObfuscated } from "@/utils/constants"
import { useObfuscatedEmail } from "@/hooks/useObfuscatedEmail"

interface CardPropsType {
  className?: string
  children: React.ReactElement[] | React.ReactElement
}

function Card({ className = "", children }: CardPropsType) {
  return (
    <div
      className={`${className} relative w-full max-w-sm overflow-hidden rounded-2xl border border-accent-800 bg-accent-50 p-8 transition-shadow duration-200 sm:hover:shadow-xl`}>
      {children}
    </div>
  )
}

interface CardTitlePropsType {
  children: string
}

function CardTitle({ children }: CardTitlePropsType) {
  return <h1 className="text-xl font-semibold text-neutral-700">{children}</h1>
}

interface CardDescriptionPropsType {
  children: string | React.ReactElement | React.ReactElement[]
}

function CardDescription({ children }: CardDescriptionPropsType) {
  return <div className="mt-2 text-neutral-600 sm:mt-3">{children}</div>
}

function ObfuscatedEmailLink({ encodedEmail }: { encodedEmail: string }) {
  const { href, label, reveal, isRevealed } = useObfuscatedEmail(encodedEmail)

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!isRevealed) {
      reveal(e)
    }
  }

  return (
    <ExternalLink href={href} onClick={handleClick} className={!isRevealed ? "italic" : undefined}>
      {isRevealed ? label : "[click to reveal]"}
    </ExternalLink>
  )
}

export default function Cards() {
  return (
    <div className="mt-32 flex w-full flex-col gap-5 pb-10 sm:mt-80 sm:flex-row sm:flex-wrap sm:gap-10 md:justify-center lg:flex-nowrap">
      <Card>
        <CardTitle>Looking for Windows or Linux?</CardTitle>
        <CardDescription>
          <p>Unfortunately we currently only support macOS.</p>
          <p className="mt-3">
            If you are on Windows or Linux, please contact us at{" "}
            <ObfuscatedEmailLink encodedEmail={EmailObfuscated.feedback} />. This will help us prioritize the
            feature if there's strong demand from users.
          </p>
        </CardDescription>
      </Card>
      <Card>
        <CardTitle>Found a bug or missing a feature?</CardTitle>
        <CardDescription>
          <>
            Please contact us at <ObfuscatedEmailLink encodedEmail={EmailObfuscated.feedback} /> with detailed
            information about the bug or feature request.
          </>
        </CardDescription>
      </Card>
      <Card>
        <CardTitle>Need help?</CardTitle>
        <CardDescription>
          <p>
            Do you need help installing{" "}
            <span className="font-logo font-semibold tracking-tight text-logo">exifoo</span>?
          </p>
          <p className="mt-2">
            Feel free to contact us at <ObfuscatedEmailLink encodedEmail={EmailObfuscated.help} /> — we're
            happy to help!
          </p>
        </CardDescription>
      </Card>
    </div>
  )
}
