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
