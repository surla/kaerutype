import { describe, expect, it } from 'vitest'

import { formatResults } from './format-results'
import type { TypingSession, TypingStats } from './types'
import { createTypingStats } from './typing-stats'

describe('formatResults', () => {
  const session: TypingSession = {
    status: 'finished',
    startedAt: 0,
    endedAt: 30000,
  }

  it('formats the stats of a finished round', () => {
    const stats: TypingStats = {
      wordsCompleted: 10,
      completedKana: 36,
      correctKeystrokes: 47,
      totalKeystrokes: 50,
    }

    expect(formatResults(stats, session)).toEqual({
      wordsPerMinute: '20',
      kanaPerMinute: '72',
      accuracy: '94.0%',
      wordsCompleted: '10',
    })
  })

  it('rounds the speeds to whole numbers', () => {
    const stats: TypingStats = {
      ...createTypingStats(),
      wordsCompleted: 10,
      completedKana: 36,
    }

    const roundingSession: TypingSession = {
      status: 'finished',
      startedAt: 0,
      endedAt: 29000,
    }

    const summary = formatResults(stats, roundingSession)

    expect(summary.wordsPerMinute).toBe('21') // 20.69
    expect(summary.kanaPerMinute).toBe('74') // 74.48
  })

  it('returns accuracy with one decimal and a percent sign', () => {
    const stats: TypingStats = {
      ...createTypingStats(),
      correctKeystrokes: 49,
      totalKeystrokes: 52,
    }

    expect(formatResults(stats, session).accuracy).toBe('94.2%')
  })
})
