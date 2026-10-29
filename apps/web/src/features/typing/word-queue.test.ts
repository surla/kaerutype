import { afterEach, describe, expect, it, vi } from 'vitest'

import type { Word } from './types'
import { advanceQueue, createWordQueue, getCurrentWord } from './word-queue'

const words: Word[] = [
  { id: 1, word: '学校', reading: 'がっこう', romaji: 'gakkou', meaning: 'school' },
  { id: 2, word: '切符', reading: 'きっぷ', romaji: 'kippu', meaning: 'ticket' },
]

describe('createWordQueue', () => {
  it('creates a word queue with the correct length and index', () => {
    const queue = createWordQueue(words)

    expect(queue.words).toHaveLength(words.length)
    expect(queue.index).toBe(0)
  })

  it('handles an empty array of words', () => {
    const words: Word[] = []

    const queue = createWordQueue(words)

    expect(queue.words).toHaveLength(0)
    expect(queue.index).toBe(0)
  })
})

describe('getCurrentWord', () => {
  it('returns the first word when the index is 0', () => {
    const queue = createWordQueue(words)

    expect(getCurrentWord(queue)).toEqual(queue.words[0])
  })

  it('returns the current word based on the index', () => {
    expect(getCurrentWord({ words, index: 1 })).toBe(words[1])
  })

  it('returns null if the index is out of bounds', () => {
    const queue = createWordQueue(words)
    queue.index = 5 // Out of bounds

    expect(getCurrentWord(queue)).toBeNull()
  })

  it('returns null for an empty queue', () => {
    const words: Word[] = []

    const queue = createWordQueue(words)

    expect(getCurrentWord(queue)).toBeNull()
  })
})

describe('advanceQueue', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('advances the index when there are more words', () => {
    const queue = createWordQueue(words)

    const newQueue = advanceQueue(queue)

    expect(newQueue.index).toBe(queue.index + 1)
  })

  it('resets the index to 0 when reaching the end of the queue', () => {
    const queue = createWordQueue(words)
    queue.index = words.length - 1 // Set to last index

    const newQueue = advanceQueue(queue)

    expect(newQueue.index).toBe(0)
  })

  it('shuffles the words when reaching the end of the queue', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0) // Mock random to control shuffle

    const next = advanceQueue({ words, index: 1 })

    expect(next).toEqual({ words, index: 0 })
  })

  it('handles an empty queue', () => {
    const words: Word[] = []

    const queue = createWordQueue(words)

    const newQueue = advanceQueue(queue)

    expect(newQueue.index).toBe(0)
    expect(newQueue.words).toHaveLength(0)
  })
})
