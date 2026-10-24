import { describe, expect, it } from 'vitest'

import type { TypingSession, TypingStats } from './types'
import { createTypingSession } from './typing-session'
import { createTypingState, typeChar } from './typing-state'
import {
  createTypingStats,
  getAccuracy,
  getKanaPerMinute,
  getWordsPerMinute,
  recordKeystroke,
} from './typing-stats'

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

describe('recordKeystroke', () => {
  it('counts a correct key partway through a kana', () => {
    const before = createTypingState('かき')
    const after = typeChar(before, 'k')

    expect(recordKeystroke(createTypingStats(), before, after)).toEqual({
      wordsCompleted: 0,
      completedKana: 0,
      correctKeystrokes: 1,
      totalKeystrokes: 1,
    })
  })

  it('counts a wrong key as a keystroke but not a correct one', () => {
    const before = createTypingState('かき')
    const after = typeChar(before, 'o')

    expect(recordKeystroke(createTypingStats(), before, after)).toEqual({
      wordsCompleted: 0,
      completedKana: 0,
      correctKeystrokes: 0,
      totalKeystrokes: 1,
    })
  })

  it('counts a kana when a key finishes it', () => {
    const before = typeChar(createTypingState('かき'), 'k')
    const after = typeChar(before, 'a')

    expect(recordKeystroke(createTypingStats(), before, after)).toEqual({
      wordsCompleted: 0,
      completedKana: 1,
      correctKeystrokes: 1,
      totalKeystrokes: 1,
    })
  })

  it('counts a word and its last kana when a key finishes the word', () => {
    let before = createTypingState('かき')
    for (const char of 'kak') before = typeChar(before, char)
    const after = typeChar(before, 'i')

    expect(recordKeystroke(createTypingStats(), before, after)).toEqual({
      wordsCompleted: 1,
      completedKana: 1,
      correctKeystrokes: 1,
      totalKeystrokes: 1,
    })
  })

  it('adds to the existing counts', () => {
    const stats: TypingStats = {
      wordsCompleted: 2,
      completedKana: 5,
      correctKeystrokes: 9,
      totalKeystrokes: 10,
    }
    const before = typeChar(createTypingState('か'), 'k')
    const after = typeChar(before, 'a')

    expect(recordKeystroke(stats, before, after)).toEqual({
      wordsCompleted: 3,
      completedKana: 6,
      correctKeystrokes: 10,
      totalKeystrokes: 11,
    })
  })

  it('ignores keys after the word is complete', () => {
    let before = createTypingState('か')
    for (const char of 'ka') before = typeChar(before, char)
    const after = typeChar(before, 'x')

    const stats: TypingStats = {
      ...createTypingStats(),
      wordsCompleted: 1,
      completedKana: 1,
      correctKeystrokes: 2,
      totalKeystrokes: 2,
    }

    expect(recordKeystroke(stats, before, after)).toBe(stats)
  })

  it('does not mutate the original stats', () => {
    const stats = createTypingStats()
    const before = createTypingState('かき')
    const after = typeChar(before, 'k')

    recordKeystroke(stats, before, after)

    expect(stats).toEqual(createTypingStats())
  })
})
