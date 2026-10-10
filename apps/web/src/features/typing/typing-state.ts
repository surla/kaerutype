import { tokenizeKana } from './tokenize-kana'
import type { BufferMatch, KanaUnit, TypingState } from './types'

export function createTypingState(word: string): TypingState {
  const kanaUnits: KanaUnit[] = tokenizeKana(word)

  return {
    kanaUnits,
    index: 0,
    buffer: '',
  }
}

export function matchBuffer(unit: KanaUnit, buffer: string): BufferMatch {
  if (unit.acceptedInputs.includes(buffer)) {
    return 'complete'
  }

  if (unit.acceptedInputs.some((acceptedInput) => acceptedInput.startsWith(buffer))) {
    return 'partial'
  }

  return 'invalid'
}
