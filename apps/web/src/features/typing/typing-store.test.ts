import { beforeEach, describe, expect, it } from 'vitest'

import type { Word } from './types'
import { createTypingState, isWordComplete } from './typing-state'
import { useTypingStore } from './typing-store'

const WORD = 'こんにちは'
const WORD_ROMAJI = 'konnnichiha'

const makeWord = (reading: string): Word => ({
  id: reading,
  word: reading,
  reading,
  meaning: reading,
})

describe('useTypingStore', () => {
  beforeEach(() => {
    useTypingStore.setState({ queue: { words: [makeWord(WORD)], index: 0 }, wordState: null })
  })

  it('should initialize with null wordState', () => {
    const { wordState } = useTypingStore.getState()
    expect(wordState).toBeNull()
  })

  it('should set wordState when start is called', () => {
    useTypingStore.getState().start()
    expect(useTypingStore.getState().wordState).not.toBeNull()
  })

  it('should replace current word when start is called again', () => {
    useTypingStore.getState().start()
    useTypingStore.getState().type('k')

    useTypingStore.getState().start()
    const newWordState = createTypingState(WORD)

    expect(useTypingStore.getState().wordState).toEqual(newWordState)
  })

  it('should do nothing when type is called before start', () => {
    useTypingStore.getState().type('k')
    expect(useTypingStore.getState().wordState).toBeNull()
  })

  it('should do nothing when backspace is called before start', () => {
    useTypingStore.getState().backspace()
    expect(useTypingStore.getState().wordState).toBeNull()
  })

  it('should complete the word when all characters are typed correctly', () => {
    useTypingStore.getState().start()
    for (const char of WORD_ROMAJI) {
      useTypingStore.getState().type(char)
    }

    const { wordState } = useTypingStore.getState()
    if (!wordState) throw new Error('Word state is null. Expected a valid word state.')
    expect(isWordComplete(wordState)).toBe(true)
  })

  it('should not complete the word when a wrong character is typed', () => {
    useTypingStore.getState().start()
    for (const char of 'konnichiwa') {
      useTypingStore.getState().type(char)
    }

    const { wordState } = useTypingStore.getState()
    if (!wordState) throw new Error('Word state is null. Expected a valid word state.')
    expect(isWordComplete(wordState)).toBe(false)
  })

  it('should restore the previous state when backspace is pressed after a wrong character', () => {
    useTypingStore.getState().start()

    const initialState = useTypingStore.getState().wordState

    useTypingStore.getState().type('k')
    expect(useTypingStore.getState().wordState).not.toEqual(initialState)

    useTypingStore.getState().backspace()
    expect(useTypingStore.getState().wordState).toEqual(initialState)
  })
})
