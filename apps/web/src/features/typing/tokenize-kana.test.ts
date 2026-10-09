import { describe, expect, it } from 'vitest'
import { kanaTable } from './kana-table'
import { tokenizeKana } from './tokenize-kana'

const kanas = (word: string) => tokenizeKana(word).map((unit) => unit.kana)
const inputs = (word: string) => tokenizeKana(word).map((unit) => unit.acceptedInputs)

describe('tokenizeKana: basic kana', () => {
  it('returns no units for an empty string', () => {
    expect(tokenizeKana('')).toEqual([])
  })

  it('makes one unit per kana', () => {
    expect(kanas('おはよう')).toEqual(['お', 'は', 'よ', 'う'])
    expect(inputs('あし')).toEqual([['a'], ['shi', 'si']])
  })
})

describe('tokenizeKana: combinations', () => {
  it('groups kana with a small ゃゅょ into one unit', () => {
    expect(kanas('きょうし')).toEqual(['きょ', 'う', 'し'])
    expect(inputs('きょ')).toEqual([['kyo']])
  })

  it('prefers the longest match', () => {
    expect(kanas('しゃ')).toEqual(['しゃ'])
    expect(kanas('ふぁ')).toEqual(['ふぁ'])
  })

  it('keeps all spellings of a combination', () => {
    expect(inputs('じゃ')[0]).toEqual(expect.arrayContaining(['ja', 'jya', 'zya']))
  })
})

describe('tokenizeKana: small っ', () => {
  it('merges っ with the next kana', () => {
    expect(kanas('かった')).toEqual(['か', 'った'])
  })

  it('accepts only the doubled consonant', () => {
    expect(inputs('った')[0]).toEqual(['tta'])
    expect(inputs('った')[0]).not.toContain('xtuta')
    expect(inputs('った')[0]).not.toContain('ltuta')
  })

  it('doubles the first letter of every spelling of the next kana', () => {
    expect(inputs('っし')[0]).toEqual(['sshi', 'ssi'])
    expect(inputs('っちゃ')[0]).toEqual(['ccha', 'ttya', 'ccya'])
  })

  it('does not accept tch for っち', () => {
    expect(inputs('っち')[0]).not.toContain('tchi')
    expect(inputs('っちゃ')[0]).not.toContain('tcha')
  })

  it('falls back to xtu/ltu when there is nothing to double', () => {
    expect(kanas('あっ')).toEqual(['あ', 'っ'])
    expect(inputs('あっ')[1]).toEqual(expect.arrayContaining(['xtu', 'ltu']))
    expect(kanas('っあ')).toEqual(['っ', 'あ'])
    expect(inputs('っあ')[0]).toEqual(expect.arrayContaining(['xtu', 'ltu']))
  })
})

describe('tokenizeKana: ん', () => {
  it('accepts n or nn before a consonant', () => {
    expect(inputs('かんじ')[1]).toEqual(['n', 'nn'])
  })

  it('requires nn at the end of a word', () => {
    expect(inputs('かん')[1]).toEqual(['nn'])
  })

  it('requires nn before a vowel', () => {
    expect(inputs('こんいん')[1]).toEqual(['nn'])
  })

  it('requires nn before y', () => {
    expect(inputs('こんや')[1]).toEqual(['nn'])
  })

  it('accepts n or nn before an n sound', () => {
    expect(inputs('かんな')[1]).toEqual(['n', 'nn'])
    expect(inputs('こんにちは')[1]).toEqual(['n', 'nn'])
    expect(inputs('みんな')[1]).toEqual(['n', 'nn'])
  })

  it('does not change the table default', () => {
    tokenizeKana('かん')
    expect(kanaTable['ん']).toEqual(['n', 'nn'])
  })
})

describe('tokenizeKana: unknown characters', () => {
  it('throws for a character that is not in the table', () => {
    expect(() => tokenizeKana('あxい')).toThrow()
  })
})
