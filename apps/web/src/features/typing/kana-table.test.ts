import { describe, expect, it } from 'vitest'
import { kanaTable } from './kana-table'

describe('kanaTable', () => {
  it('has the vowels', () => {
    expect(kanaTable['あ']).toEqual(['a'])
    expect(kanaTable['お']).toEqual(['o'])
  })

  it('accepts both spellings of the common variants', () => {
    expect(kanaTable['し']).toEqual(expect.arrayContaining(['shi', 'si']))
    expect(kanaTable['ち']).toEqual(expect.arrayContaining(['chi', 'ti']))
    expect(kanaTable['つ']).toEqual(expect.arrayContaining(['tsu', 'tu']))
    expect(kanaTable['ふ']).toEqual(expect.arrayContaining(['fu', 'hu']))
  })

  it('has combinations with several spellings', () => {
    expect(kanaTable['しゃ']).toEqual(expect.arrayContaining(['sha', 'sya']))
    expect(kanaTable['じゃ']).toEqual(expect.arrayContaining(['ja', 'jya', 'zya']))
    expect(kanaTable['きょ']).toEqual(['kyo'])
  })

  it('has small kana with x and l forms', () => {
    expect(kanaTable['ゃ']).toEqual(['xya', 'lya'])
  })

  it('types ぢ and づ as di and du', () => {
    expect(kanaTable['ぢ']).toEqual(['di'])
    expect(kanaTable['づ']).toEqual(['du'])
  })

  it('has ん with n and nn as its default inputs', () => {
    expect(kanaTable['ん']).toEqual(['n', 'nn'])
  })

  it('lists っ with its explicit forms', () => {
    expect(kanaTable['っ']).toEqual(expect.arrayContaining(['xtu', 'ltu']))
  })

  it('has the long vowel mark', () => {
    expect(kanaTable['ー']).toEqual(['-'])
  })

  it('has at least one non-empty, unique input for every kana', () => {
    for (const [kana, inputs] of Object.entries(kanaTable)) {
      expect(inputs.length, kana).toBeGreaterThan(0)
      expect(
        inputs.every((input) => input.length > 0),
        kana,
      ).toBe(true)
      expect(new Set(inputs).size, kana).toBe(inputs.length)
    }
  })
})
