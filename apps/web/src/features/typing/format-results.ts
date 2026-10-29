import type { ResultsSummary, TypingSession, TypingStats } from './types'
import { getAccuracy, getKanaPerMinute, getWordsPerMinute } from './typing-stats'

export function formatResults(stats: TypingStats, session: TypingSession): ResultsSummary {
  return {
    wordsPerMinute: String(Math.round(getWordsPerMinute(stats, session))),
    kanaPerMinute: String(Math.round(getKanaPerMinute(stats, session))),
    accuracy: `${getAccuracy(stats).toFixed(1)}%`,
    wordsCompleted: String(stats.wordsCompleted),
  }
}
