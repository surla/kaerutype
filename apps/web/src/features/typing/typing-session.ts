import type { TypingSession } from './types'

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
