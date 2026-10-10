import { describe, expect, it } from 'vitest'
import { createTypingState, matchBuffer } from './typing-state'
import type { KanaUnit } from './types'

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

describe('matchBuffer', () => {
  const a: KanaUnit = { kana: 'あ', acceptedInputs: ['a'] }
  const shi: KanaUnit = { kana: 'し', acceptedInputs: ['shi', 'si'] }

  describe('complete', () => {
    it('matches an accepted input exactly', () => {
      expect(matchBuffer(a, 'a')).toBe('complete')
    })

    it('matches any accepted input, not just the first', () => {
      expect(matchBuffer(shi, 'si')).toBe('complete')
    })
  })

  describe('partial', () => {
    it('is the start of an accepted input', () => {
      expect(matchBuffer(shi, 'sh')).toBe('partial')
    })

    it('is an empty buffer', () => {
      expect(matchBuffer(a, '')).toBe('partial')
    })
  })

  describe('invalid', () => {
    it('matches no accepted input', () => {
      expect(matchBuffer(a, 'i')).toBe('invalid')
    })

    it('is longer than any accepted input', () => {
      expect(matchBuffer(a, 'ab')).toBe('invalid')
    })

    it('starts correctly then goes wrong', () => {
      expect(matchBuffer(shi, 'sha')).toBe('invalid')
    })
  })
})
