import { describe, expect, it } from 'vitest'
import { createTypingState } from './typing-state'

describe('createTypingState', () => {
  it('initializes with an empty buffer', () => {
    const state = createTypingState('ありがとう')
    expect(state.index).toBe(0)
    expect(state.buffer).toBe('')
  })

  it('splits the input string into individual kana units', () => {
    const state = createTypingState('ありがとう')
    expect(state.kanaUnits).toEqual([
      { kana: 'あ', acceptedInputs: ['a'] },
      { kana: 'り', acceptedInputs: ['ri'] },
      { kana: 'が', acceptedInputs: ['ga'] },
      { kana: 'と', acceptedInputs: ['to'] },
      { kana: 'う', acceptedInputs: ['u'] },
    ])
  })
})
