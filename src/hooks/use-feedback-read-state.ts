import * as React from "react"

const STORAGE_KEY = "exifoo_admin_read_feedback_ids"
const READ_STATE_EVENT = "feedback-read-state-change"

function readStoredIds(): Set<string> {
  if (typeof window === "undefined") return new Set()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

function writeStoredIds(ids: Set<string>) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
  window.dispatchEvent(new Event(READ_STATE_EVENT))
}

export function useFeedbackReadState() {
  const [readIds, setReadIds] = React.useState<Set<string>>(() => new Set())

  React.useEffect(() => {
    setReadIds(readStoredIds())
    const handleChange = () => setReadIds(readStoredIds())
    window.addEventListener(READ_STATE_EVENT, handleChange)
    window.addEventListener("storage", handleChange)
    return () => {
      window.removeEventListener(READ_STATE_EVENT, handleChange)
      window.removeEventListener("storage", handleChange)
    }
  }, [])

  const isRead = React.useCallback((id: string) => readIds.has(id), [readIds])

  const markAsRead = React.useCallback((id: string) => {
    const next = readStoredIds()
    if (next.has(id)) return
    next.add(id)
    writeStoredIds(next)
    setReadIds(next)
  }, [])

  return { isRead, markAsRead }
}
