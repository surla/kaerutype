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

export function typeChar(state: TypingState, char: string): TypingState {
  const { kanaUnits, index, buffer } = state
  const currentUnit = kanaUnits[index]
  if (!currentUnit) return state

  const newBuffer = buffer + char
  const match = matchBuffer(currentUnit, newBuffer)

  if (match === 'complete') {
    return {
      ...state,
      index: index + 1,
      buffer: '',
    }
  }

  return {
    ...state,
    buffer: newBuffer,
  }
}

export function backspace(state: TypingState): TypingState {
  if (!state.buffer) return state

  return {
    ...state,
    buffer: state.buffer.slice(0, -1),
  }
}

export function isWordComplete(state: TypingState): boolean {
  return state.index === state.kanaUnits.length
}
