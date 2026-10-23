import { describe, expect, it } from 'vitest'

import type { TypingSession } from './types'
import {
  createTypingSession,
  finishTypingSession,
  getElapsedMinutes,
  getRemainingSeconds,
  resetTypingSession,
  startTypingSession,
} from './typing-session'

describe('createTypingSession', () => {
  it('should create a new typing session with default values', () => {
    const session: TypingSession = createTypingSession()

    expect(session).toEqual({
      status: 'idle',
      startedAt: null,
      endedAt: null,
    })
  })

  it('returns a new object each time', () => {
    expect(createTypingSession()).not.toBe(createTypingSession())
  })
})

describe('startTypingSession', () => {
  it('starts an idle session', () => {
    const started = startTypingSession(createTypingSession(), 1000)

    expect(started).toEqual({
      status: 'in-progress',
      startedAt: 1000,
      endedAt: null,
    })
  })

  it('does not restart a session that is already in progress', () => {
    const started = startTypingSession(createTypingSession(), 1000)

    expect(startTypingSession(started, 2000)).toBe(started)
  })

  it('does not restart a finished session', () => {
    const finished: TypingSession = {
      status: 'finished',
      startedAt: 1000,
      endedAt: 2000,
    }

    expect(startTypingSession(finished, 3000)).toBe(finished)
  })

  it('does not mutate the original session', () => {
    const session = createTypingSession()

    startTypingSession(session, 1000)

    expect(session).toEqual(createTypingSession())
  })
})

describe('finishTypingSession', () => {
  it('should finish an in progress session', () => {
    const started = startTypingSession(createTypingSession(), 1000)

    expect(finishTypingSession(started, 2000)).toEqual({
      status: 'finished',
      startedAt: 1000,
      endedAt: 2000,
    })
  })

  it('should not finish an idle session', () => {
    const idle = createTypingSession()

    expect(finishTypingSession(idle, 1000)).toBe(idle)
  })

  it('should not overwrite an already finished session', () => {
    const started = startTypingSession(createTypingSession(), 1000)
    const finished = finishTypingSession(started, 2000)

    const result = finishTypingSession(finished, 4000)

    expect(result).toBe(finished)
    expect(result.endedAt).toBe(2000)
  })

  it('does not mutate the original session', () => {
    const started = startTypingSession(createTypingSession(), 1000)

    finishTypingSession(started, 2000)

    expect(started).toEqual({
      status: 'in-progress',
      startedAt: 1000,
      endedAt: null,
    })
  })
})

describe('resetTypingSession', () => {
  it('returns an idle session with no timestamps', () => {
    expect(resetTypingSession()).toEqual({
      status: 'idle',
      startedAt: null,
      endedAt: null,
    })
  })

  it('matches a newly created session', () => {
    expect(resetTypingSession()).toEqual(createTypingSession())
  })

  it('returns a new object each time', () => {
    expect(resetTypingSession()).not.toBe(resetTypingSession())
  })
})

describe('getRemainingSeconds', () => {
  it('returns the full duration for an idle session', () => {
    expect(getRemainingSeconds(createTypingSession(), 5000, 30)).toBe(30)
  })

  it('return the time left for an in-progess session', () => {
    const started = startTypingSession(createTypingSession(), 1000)

    expect(getRemainingSeconds(started, 11000, 30)).toBe(20)
  })

  it('returns zero once the time is up', () => {
    const started = startTypingSession(createTypingSession(), 1000)

    expect(getRemainingSeconds(started, 51000, 30)).toBe(0)
  })

  it('returns zero exactnly at the end', () => {
    const started = startTypingSession(createTypingSession(), 1000)

    expect(getRemainingSeconds(started, 31000, 30)).toBe(0)
  })

  it('returns zero for a finished session', () => {
    const finished: TypingSession = {
      status: 'finished',
      startedAt: 1000,
      endedAt: 2000,
    }

    expect(getRemainingSeconds(finished, 5000, 30)).toBe(0)
  })
})

describe('getElapsedMinutes', () => {
  it('returns the elapsed time in minutes', () => {
    const session: TypingSession = {
      status: 'finished',
      startedAt: 0,
      endedAt: 60000,
    }

    expect(getElapsedMinutes(session)).toBe(1)
  })

  it('returns fractions of a minute', () => {
    const session: TypingSession = {
      status: 'finished',
      startedAt: 0,
      endedAt: 30000,
    }

    expect(getElapsedMinutes(session)).toBe(0.5)
  })

  it('returns zero for an idle session', () => {
    const session = createTypingSession()

    expect(getElapsedMinutes(session)).toBe(0)
  })

  it('returns zero for a session that has not ended', () => {
    const session: TypingSession = {
      status: 'in-progress',
      startedAt: 1000,
      endedAt: null,
    }

    expect(getElapsedMinutes(session)).toBe(0)
  })

  it('returns zero when the end is before the start', () => {
    const session: TypingSession = {
      status: 'finished',
      startedAt: 2000,
      endedAt: 1000,
    }

    expect(getElapsedMinutes(session)).toBe(0)
  })
})
