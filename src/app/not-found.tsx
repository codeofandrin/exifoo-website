"use client"

import Button from "@/components/common/Button"

export default function NotFound() {
  function handleReturnHome() {
    window.location.href = "/"
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <h1 className="font-logo text-4xl font-semibold text-neutral-800">404: Not Found</h1>
      <p className="mt-8 text-neutral-600">The requested resource could not be found.</p>
      <Button color="primary" className="mt-14" onClick={handleReturnHome}>
        Return Home
      </Button>
    </div>
  )
}
