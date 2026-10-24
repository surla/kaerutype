import { describe, expect, it } from 'vitest'

import type { TypingSession, TypingStats } from './types'
import { createTypingSession } from './typing-session'
import { createTypingStats, getAccuracy, getKanaPerMinute, getWordsPerMinute } from './typing-stats'

describe('createTypingStats', () => {
  it('creates stats with all counts at zero', () => {
    expect(createTypingStats()).toEqual({
      wordsCompleted: 0,
      completedKana: 0,
      correctKeystrokes: 0,
      totalKeystrokes: 0,
    })
  })

  it('returns a new object each time', () => {
    expect(createTypingStats()).not.toBe(createTypingStats())
  })
})

describe('getAccuracy', () => {
  it('returns 100 when every keystroke is correct', () => {
    const stats: TypingStats = {
      ...createTypingStats(),
      correctKeystrokes: 10,
      totalKeystrokes: 10,
    }

    expect(getAccuracy(stats)).toBe(100)
  })

  it('returns the percentage of correct keystrokes', () => {
    const stats: TypingStats = {
      ...createTypingStats(),
      correctKeystrokes: 5,
      totalKeystrokes: 10,
    }

    expect(getAccuracy(stats)).toBe(50)
  })

  it('returns 0 when no keys are typed', () => {
    const stats: TypingStats = {
      ...createTypingStats(),
      correctKeystrokes: 0,
      totalKeystrokes: 0,
    }

    expect(getAccuracy(stats)).toBe(0)
  })

  it('does not round the result', () => {
    const stats: TypingStats = {
      ...createTypingStats(),
      correctKeystrokes: 1,
      totalKeystrokes: 3,
    }

    expect(getAccuracy(stats)).toBeCloseTo(33.33, 2)
  })
})

describe('getWordsPerMinute', () => {
  it('returns words completed per minute', () => {
    const stats: TypingStats = {
      ...createTypingStats(),
      wordsCompleted: 10,
    }
    const session: TypingSession = {
      status: 'finished',
      startedAt: 0,
      endedAt: 30000,
    }

    expect(getWordsPerMinute(stats, session)).toBe(20)
  })

  it('does not round the result', () => {
    const stats: TypingStats = {
      ...createTypingStats(),
      wordsCompleted: 1,
    }
    const session: TypingSession = {
      status: 'finished',
      startedAt: 0,
      endedAt: 40000,
    }

    expect(getWordsPerMinute(stats, session)).toBe(1.5)
  })

  it('returns zero when no words were completed', () => {
    const stats: TypingStats = {
      ...createTypingStats(),
      wordsCompleted: 0,
    }
    const session: TypingSession = {
      status: 'finished',
      startedAt: 0,
      endedAt: 40000,
    }

    expect(getWordsPerMinute(stats, session)).toBe(0)
  })

  it('returns zero for an idle session', () => {
    const stats: TypingStats = {
      ...createTypingStats(),
      wordsCompleted: 10,
    }
    const session = createTypingSession()

    expect(getWordsPerMinute(stats, session)).toBe(0)
  })

  it('returns zero for a session that has not ended', () => {
    const stats: TypingStats = {
      ...createTypingStats(),
      wordsCompleted: 10,
    }
    const session: TypingSession = {
      status: 'in-progress',
      startedAt: 1000,
      endedAt: null,
    }

    expect(getWordsPerMinute(stats, session)).toBe(0)
  })

  it('returns zero when no time has passed', () => {
    const stats: TypingStats = {
      ...createTypingStats(),
      wordsCompleted: 10,
    }
    const session: TypingSession = {
      status: 'finished',
      startedAt: 0,
      endedAt: 0,
    }

    expect(getWordsPerMinute(stats, session)).toBe(0)
  })
})

describe('getKanaPerMinute', () => {
  it('returns completed kana per minute', () => {
    const stats: TypingStats = {
      ...createTypingStats(),
      completedKana: 60,
    }
    const session: TypingSession = {
      status: 'finished',
      startedAt: 0,
      endedAt: 30000,
    }

    expect(getKanaPerMinute(stats, session)).toBe(120)
  })

  it('does not round the result', () => {
    const stats: TypingStats = {
      ...createTypingStats(),
      completedKana: 5,
    }
    const session: TypingSession = {
      status: 'finished',
      startedAt: 0,
      endedAt: 40000,
    }

    expect(getKanaPerMinute(stats, session)).toBe(7.5)
  })

  it('returns zero when no kana were completed', () => {
    const stats: TypingStats = {
      ...createTypingStats(),
      completedKana: 0,
    }
    const session: TypingSession = {
      status: 'finished',
      startedAt: 0,
      endedAt: 40000,
    }

    expect(getKanaPerMinute(stats, session)).toBe(0)
  })

  it('returns zero for an idle session', () => {
    const stats: TypingStats = {
      ...createTypingStats(),
      completedKana: 60,
    }
    const session = createTypingSession()

    expect(getKanaPerMinute(stats, session)).toBe(0)
  })

  it('returns zero for a session that has not ended', () => {
    const stats: TypingStats = {
      ...createTypingStats(),
      completedKana: 60,
    }
    const session: TypingSession = {
      status: 'in-progress',
      startedAt: 1000,
      endedAt: null,
    }

    expect(getKanaPerMinute(stats, session)).toBe(0)
  })

  it('returns zero when no time has passed', () => {
    const stats: TypingStats = {
      ...createTypingStats(),
      completedKana: 60,
    }
    const session: TypingSession = {
      status: 'finished',
      startedAt: 0,
      endedAt: 0,
    }

    expect(getKanaPerMinute(stats, session)).toBe(0)
  })
})
