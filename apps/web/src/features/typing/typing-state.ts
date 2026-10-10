import { tokenizeKana } from './tokenize-kana'
import type { KanaUnit, TypingState } from './types'

export function createTypingState(word: string): TypingState {
  const kanaUnits: KanaUnit[] = tokenizeKana(word)

  return {
    kanaUnits,
    index: 0,
    buffer: '',
  }
}
