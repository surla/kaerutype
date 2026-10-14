import { describe, expect, it } from 'vitest'
import { shuffle } from './shuffle'

describe('shuffle', () => {
  const items = [1, 2, 3, 4, 5]

  it('returns an array of the same length', () => {
    expect(shuffle(items)).toHaveLength(items.length)
  })

  it('contains the same elements as the original array', () => {
    const result = shuffle(items)

    expect([...result].sort((a, b) => a - b)).toEqual(items)
  })

  it('returns a new array', () => {
    expect(shuffle(items)).not.toBe(items)
  })

  it('does not mutate the original array', () => {
    const originalArray = [...items]

    shuffle(items)

    expect(items).toEqual(originalArray)
  })

  it('handles an empty array', () => {
    expect(shuffle([])).toEqual([])
  })

  it('handles an array with one element', () => {
    expect(shuffle([1])).toEqual([1])
  })

  it('produces a predictable order with fixed randomness', () => {
    expect(shuffle([1, 2, 3], () => 0)).toEqual([2, 3, 1])
  })

  it('preserves order when randomness selects the last index', () => {
    expect(shuffle([1, 2, 3], () => 0.999)).toEqual([1, 2, 3])
  })

  it('shuffles an array of strings', () => {
    const words = ['ねこ', 'いぬ', 'とり']

    expect(shuffle(words, () => 0)).toEqual(['いぬ', 'とり', 'ねこ'])
  })
})
