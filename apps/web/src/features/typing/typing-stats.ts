import type { TypingStats } from './types'

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
