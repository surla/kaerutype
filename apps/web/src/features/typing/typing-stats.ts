import type { TypingSession, TypingState, TypingStats } from './types'
import { getElapsedMinutes } from './typing-session'
import { isWordComplete, matchBuffer } from './typing-state'

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

export function recordKeystroke(
  stats: TypingStats,
  before: TypingState,
  after: TypingState,
): TypingStats {
  if (isWordComplete(before)) return stats

  const unit = after.kanaUnits[after.index]
  const wasCorrect = unit ? matchBuffer(unit, after.buffer) !== 'invalid' : after.buffer === ''

  return {
    wordsCompleted: stats.wordsCompleted + (wasCorrect && isWordComplete(after) ? 1 : 0),
    completedKana: stats.completedKana + (after.index - before.index),
    correctKeystrokes: stats.correctKeystrokes + (wasCorrect ? 1 : 0),
    totalKeystrokes: stats.totalKeystrokes + 1,
  }
}
