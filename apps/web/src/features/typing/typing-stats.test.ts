import { describe, expect, it } from 'vitest'

import type { TypingStats } from './types'
import { createTypingStats, getAccuracy } from './typing-stats'

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
