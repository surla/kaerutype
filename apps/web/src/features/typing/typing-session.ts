import type { TypingSession } from './types'

export const DEFAULT_SESSION_DURATION_SECONDS = 30

export function createTypingSession(): TypingSession {
  return {
    status: 'idle',
    startedAt: null,
    endedAt: null,
  }
}

export function startTypingSession(session: TypingSession, now: number): TypingSession {
  if (session.status !== 'idle') return session

  return {
    ...session,
    status: 'in-progress',
    startedAt: now,
  }
}

export function finishTypingSession(session: TypingSession, now: number): TypingSession {
  if (session.status !== 'in-progress') return session

  return {
    ...session,
    status: 'finished',
    endedAt: now,
  }
}

export function resetTypingSession(): TypingSession {
  return createTypingSession()
}

export function getRemainingSeconds(
  session: TypingSession,
  now: number,
  durationSeconds: number,
): number {
  if (session.status === 'finished') return 0
  if (session.startedAt === null) return durationSeconds

  const elapsedSeconds = (now - session.startedAt) / 1000

  return Math.max(0, durationSeconds - elapsedSeconds)
}
