import { describe, expect, it } from 'vitest'
import { createTypingStats } from './typing-stats'

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
