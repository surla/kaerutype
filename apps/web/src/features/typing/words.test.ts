import { describe, expect, it } from 'vitest'

import { tokenizeKana } from './tokenize-kana'
import { createTypingState, isWordComplete, typeChar } from './typing-state'
import { words } from './words'

describe('words', () => {
  it('has 300 words', () => {
    expect(words).toHaveLength(300)
  })

  it('has unique ids', () => {
    const ids = words.map((word) => word.id)

    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has no duplicate words', () => {
    const keys = words.map((word) => `${word.word}|${word.reading}`)

    expect(new Set(keys).size).toBe(keys.length)
  })

  describe.each(words)('$word ($reading)', (entry) => {
    it('has every field filled in', () => {
      expect(entry.id).not.toBe('')
      expect(entry.word).not.toBe('')
      expect(entry.reading).not.toBe('')
      expect(entry.romaji).not.toBe('')
      expect(entry.meaning).not.toBe('')
    })

    it('can be typed to completion', () => {
      const units = tokenizeKana(entry.reading)
      expect(units.length).toBeGreaterThan(0)

      let state = createTypingState(entry.reading)
      for (const unit of units) {
        for (const char of unit.acceptedInputs[0]) {
          state = typeChar(state, char)
        }
      }

      expect(isWordComplete(state)).toBe(true)
    })

    it('can be typed with its romaji', () => {
      let state = createTypingState(entry.reading)
      for (const char of entry.romaji) {
        state = typeChar(state, char)
      }

      expect(isWordComplete(state)).toBe(true)
    })
  })
})
