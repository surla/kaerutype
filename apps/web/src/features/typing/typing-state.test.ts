import { describe, expect, it } from 'vitest'
import { createTypingState, matchBuffer, typeChar } from './typing-state'
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

describe('typeChar', () => {
  describe('complete', () => {
    it('completes the kana on the first spelling', () => {
      const state = { ...createTypingState('すし'), buffer: 's' }
      const result = typeChar(state, 'u')
      expect(result.index).toBe(1)
      expect(result.buffer).toBe('')
    })

    it('completes the kana on the longer spelling', () => {
      const state = { ...createTypingState('すし'), index: 1, buffer: 'sh' }
      const result = typeChar(state, 'i')
      expect(result.index).toBe(2)
      expect(result.buffer).toBe('')
    })
  })

  describe('invalid', () => {
    it('keeps a wrong letter in the buffer without advancing', () => {
      const state = createTypingState('すし')
      const result = typeChar(state, 'k')
      expect(result.index).toBe(0)
      expect(result.buffer).toBe('k')
    })

    it('stays invalid after more letters, even ones that would match', () => {
      const state = { ...createTypingState('すし'), buffer: 'k' }
      const result = typeChar(state, 'u')
      expect(result.index).toBe(0)
      expect(result.buffer).toBe('ku')
    })
  })

  describe('finished word', () => {
    it('returns the same state when there is no current kana', () => {
      const state = { ...createTypingState('すし'), index: 2 }
      expect(typeChar(state, 'a')).toBe(state)
    })
  })

  describe('immutability', () => {
    it('does not change the state it receives', () => {
      const state = createTypingState('すし')
      typeChar(state, 's')
      expect(state.index).toBe(0)
      expect(state.buffer).toBe('')
    })
  })

  describe('whole word', () => {
    it('finishes the word when every kana is typed', () => {
      const final = [...'sushi'].reduce(
        (state, char) => typeChar(state, char),
        createTypingState('すし'),
      )
      expect(final.index).toBe(2)
      expect(final.buffer).toBe('')
    })
  })
})
