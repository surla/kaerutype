import { beforeEach, describe, expect, it } from 'vitest'

import type { Word } from './types'
import { createTypingSession } from './typing-session'
import { createTypingState, isWordComplete } from './typing-state'
import { createTypingStats } from './typing-stats'
import { useTypingStore } from './typing-store'

const WORD = 'こんにちは'
const WORD_ROMAJI = 'konnnichiha'

let nextId = 1

const makeWord = (reading: string): Word => ({
  id: nextId++,
  word: reading,
  reading,
  romaji: reading,
  meaning: reading,
})

describe('useTypingStore', () => {
  beforeEach(() => {
    useTypingStore.setState({
      queue: { words: [makeWord(WORD)], index: 0 },
      wordState: null,
      session: createTypingSession(),
      stats: createTypingStats(),
    })
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
    useTypingStore.getState().type('k', 1000)

    useTypingStore.getState().start()
    const newWordState = createTypingState(WORD)

    expect(useTypingStore.getState().wordState).toEqual(newWordState)
  })

  it('should do nothing when type is called before start', () => {
    useTypingStore.getState().type('k', 1000)
    expect(useTypingStore.getState().wordState).toBeNull()
  })

  it('should do nothing when backspace is called before start', () => {
    useTypingStore.getState().backspace()
    expect(useTypingStore.getState().wordState).toBeNull()
  })

  it('should complete the word when all characters are typed correctly', () => {
    useTypingStore.getState().start()
    for (const char of WORD_ROMAJI) {
      useTypingStore.getState().type(char, 1000)
    }

    const { wordState } = useTypingStore.getState()
    if (!wordState) throw new Error('Word state is null. Expected a valid word state.')
    expect(isWordComplete(wordState)).toBe(true)
  })

  it('should not complete the word when a wrong character is typed', () => {
    useTypingStore.getState().start()
    for (const char of 'konnichiwa') {
      useTypingStore.getState().type(char, 1000)
    }

    const { wordState } = useTypingStore.getState()
    if (!wordState) throw new Error('Word state is null. Expected a valid word state.')
    expect(isWordComplete(wordState)).toBe(false)
  })

  it('should restore the previous state when backspace is pressed after a wrong character', () => {
    useTypingStore.getState().start()

    const initialState = useTypingStore.getState().wordState

    useTypingStore.getState().type('k', 1000)
    expect(useTypingStore.getState().wordState).not.toEqual(initialState)

    useTypingStore.getState().backspace()
    expect(useTypingStore.getState().wordState).toEqual(initialState)
  })

  it('initializes with an idle session', () => {
    expect(useTypingStore.getState().session).toEqual(createTypingSession())
  })

  it('starts a session', () => {
    useTypingStore.getState().startSession(1000)

    expect(useTypingStore.getState().session).toEqual({
      status: 'in-progress',
      startedAt: 1000,
      endedAt: null,
    })
  })

  it('does not restart an in-progress session', () => {
    useTypingStore.getState().startSession(1000)
    useTypingStore.getState().startSession(2000)

    expect(useTypingStore.getState().session).toEqual({
      status: 'in-progress',
      startedAt: 1000,
      endedAt: null,
    })
  })

  it('finishes an in-progress session', () => {
    useTypingStore.getState().startSession(1000)
    useTypingStore.getState().finishSession(2000)

    expect(useTypingStore.getState().session).toEqual({
      status: 'finished',
      startedAt: 1000,
      endedAt: 2000,
    })
  })

  it('does not finish an idle session', () => {
    useTypingStore.getState().finishSession(2000)

    expect(useTypingStore.getState().session).toEqual(createTypingSession())
  })

  it('resets the session', () => {
    useTypingStore.getState().startSession(1000)
    useTypingStore.getState().finishSession(2000)
    useTypingStore.getState().resetSession()

    expect(useTypingStore.getState().session).toEqual(createTypingSession())
  })

  it('starts the session on the first keystroke', () => {
    useTypingStore.getState().start()
    useTypingStore.getState().type('k', 1000)

    expect(useTypingStore.getState().session).toEqual({
      status: 'in-progress',
      startedAt: 1000,
      endedAt: null,
    })
  })

  it('does not start the session when a key is typed before', () => {
    useTypingStore.getState().type('k', 1000)

    expect(useTypingStore.getState().session).toEqual(createTypingSession())
  })

  it('keeps the original start time on later keystrokes', () => {
    useTypingStore.getState().start()
    useTypingStore.getState().type('k', 1000)
    useTypingStore.getState().type('o', 2000)

    expect(useTypingStore.getState().session.startedAt).toBe(1000)
  })

  it('starts the session on a wrong first keystroke', () => {
    useTypingStore.getState().start()
    useTypingStore.getState().type('o', 1000)

    expect(useTypingStore.getState().session.startedAt).toBe(1000)
  })

  it('ignores typing after a session is finished', () => {
    useTypingStore.getState().start()
    useTypingStore.getState().type('k', 1000)
    useTypingStore.getState().finishSession(2000)

    const before = useTypingStore.getState().wordState

    useTypingStore.getState().type('o', 3000)

    expect(useTypingStore.getState().wordState).toBe(before)
  })

  it('ignores backspace after a session is finished', () => {
    useTypingStore.getState().start()
    useTypingStore.getState().type('k', 1000)
    useTypingStore.getState().finishSession(2000)

    const before = useTypingStore.getState().wordState

    useTypingStore.getState().backspace()

    expect(useTypingStore.getState().wordState).toBe(before)
  })

  it('resets the session on restart', () => {
    useTypingStore.getState().start()
    useTypingStore.getState().type('k', 1000)
    useTypingStore.getState().finishSession(2000)

    useTypingStore.getState().restart()

    expect(useTypingStore.getState().session).toEqual(createTypingSession())
  })

  it('goes back to the first word on restart', () => {
    useTypingStore.setState({
      queue: { words: [makeWord('あい'), makeWord('うえ'), makeWord('おか')], index: 2 },
    })

    useTypingStore.getState().start()
    useTypingStore.getState().restart()

    const { queue, wordState } = useTypingStore.getState()

    expect(queue.index).toBe(0)
    expect(wordState).toEqual(createTypingState(queue.words[0].reading))
  })

  it('accepts typing again after restart', () => {
    useTypingStore.getState().start()
    useTypingStore.getState().type('k', 1000)
    useTypingStore.getState().finishSession(2000)

    useTypingStore.getState().restart()
    useTypingStore.getState().type('k', 4000)

    expect(useTypingStore.getState().session).toEqual({
      status: 'in-progress',
      startedAt: 4000,
      endedAt: null,
    })
  })

  it('counts a correct keystroke', () => {
    useTypingStore.getState().start()
    useTypingStore.getState().type('k', 1000)

    expect(useTypingStore.getState().stats).toEqual({
      wordsCompleted: 0,
      completedKana: 0,
      correctKeystrokes: 1,
      totalKeystrokes: 1,
    })
  })

  it('counts a wrong keystroke without counting it as correct', () => {
    useTypingStore.getState().start()
    useTypingStore.getState().type('z', 1000)

    expect(useTypingStore.getState().stats).toEqual({
      wordsCompleted: 0,
      completedKana: 0,
      correctKeystrokes: 0,
      totalKeystrokes: 1,
    })
  })

  it('counts a completed word', () => {
    useTypingStore.getState().start()
    for (const char of WORD_ROMAJI) {
      useTypingStore.getState().type(char, 1000)
    }

    expect(useTypingStore.getState().stats).toEqual({
      wordsCompleted: 1,
      completedKana: 5,
      correctKeystrokes: 11,
      totalKeystrokes: 11,
    })
  })

  it('does not count keys typed before start', () => {
    useTypingStore.getState().type('k', 1000)

    expect(useTypingStore.getState().stats).toEqual(createTypingStats())
  })

  it('does not count keys typed after the session finishes', () => {
    useTypingStore.getState().start()
    useTypingStore.getState().type('k', 1000)
    useTypingStore.getState().finishSession(2000)
    useTypingStore.getState().type('o', 3000)

    expect(useTypingStore.getState().stats.totalKeystrokes).toBe(1)
  })

  it('resets the stats on restart', () => {
    useTypingStore.getState().start()
    useTypingStore.getState().type('k', 1000)

    useTypingStore.getState().restart()

    expect(useTypingStore.getState().stats).toEqual(createTypingStats())
  })
})
