import type { TypingStats } from './types'

export function createTypingStats(): TypingStats {
  return {
    wordsCompleted: 0,
    completedKana: 0,
    correctKeystrokes: 0,
    totalKeystrokes: 0,
  }
}
