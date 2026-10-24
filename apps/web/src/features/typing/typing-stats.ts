import type { TypingSession, TypingStats } from './types'
import { getElapsedMinutes } from './typing-session'

export function createTypingStats(): TypingStats {
  return {
    wordsCompleted: 0,
    completedKana: 0,
    correctKeystrokes: 0,
    totalKeystrokes: 0,
  }
}

export function getAccuracy(stats: TypingStats): number {
  const { correctKeystrokes, totalKeystrokes } = stats

  if (totalKeystrokes === 0) return 0

  return (correctKeystrokes / totalKeystrokes) * 100
}

export function getWordsPerMinute(stats: TypingStats, session: TypingSession): number {
  const minutes = getElapsedMinutes(session)

  if (minutes === 0) return 0

  return stats.wordsCompleted / minutes
}

export function getKanaPerMinute(stats: TypingStats, session: TypingSession): number {
  const minutes = getElapsedMinutes(session)

  if (minutes === 0) return 0

  return stats.completedKana / minutes
}
