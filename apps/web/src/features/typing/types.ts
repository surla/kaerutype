export type KanaUnit = {
  kana: string
  acceptedInputs: string[]
}

export type KanaTable = Record<string, string[]>

export type TypingState = {
  kanaUnits: KanaUnit[]
  index: number
  buffer: string
}

export type BufferMatch = 'complete' | 'partial' | 'invalid'

export type Word = {
  id: number
  word: string
  reading: string
  romaji: string
  meaning: string
}

export type WordQueue = {
  words: Word[]
  index: number
}

export type TypingSession = {
  status: 'idle' | 'in-progress' | 'finished'
  startedAt: number | null
  endedAt: number | null
}

export type TypingStats = {
  wordsCompleted: number
  completedKana: number
  correctKeystrokes: number
  totalKeystrokes: number
}

export type ResultsSummary = {
  wordsPerMinute: string
  kanaPerMinute: string
  accuracy: string
  wordsCompleted: string
}
