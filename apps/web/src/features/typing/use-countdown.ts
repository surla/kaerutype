import { useEffect, useState } from 'react'

import { getRemainingSeconds } from './typing-session'
import { useTypingStore } from './typing-store'

export function useCountdown(durationSeconds: number): number {
  const session = useTypingStore((state) => state.session)
  const finishSession = useTypingStore((state) => state.finishSession)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (session.status !== 'in-progress') return

    const id = setInterval(() => {
      setNow(Date.now())
    }, 100)

    return () => clearInterval(id)
  }, [session.status])

  const remaining = getRemainingSeconds(session, now, durationSeconds)

  useEffect(() => {
    if (session.status !== 'in-progress' || session.startedAt === null) return

    if (remaining <= 0) {
      finishSession(session.startedAt + durationSeconds * 1000)
    }
  }, [session.status, session.startedAt, remaining, durationSeconds, finishSession])

  return Math.ceil(remaining)
}
