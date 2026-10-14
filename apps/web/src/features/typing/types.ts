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
  id: string
  word: string
  reading: string
  meaning: string
}
