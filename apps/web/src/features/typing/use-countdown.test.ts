// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { createTypingSession } from './typing-session'
import { useTypingStore } from './typing-store'
import { useCountdown } from './use-countdown'

describe('useCountdown', () => {
  beforeEach(() => {
    useTypingStore.setState({ session: createTypingSession() })
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('returns the full duration for an idle session', () => {
    const { result } = renderHook(() => useCountdown(30))

    expect(result.current).toBe(30)
  })

  it('returns the time left as time passes', () => {
    vi.useFakeTimers()
    vi.setSystemTime(1000)
    useTypingStore.getState().startSession(1000)

    const { result } = renderHook(() => useCountdown(30))

    act(() => {
      vi.advanceTimersByTime(10000)
    })

    expect(result.current).toBe(20)
  })

  it('finishes the session when time runs out', () => {
    vi.useFakeTimers()
    vi.setSystemTime(1000)
    useTypingStore.getState().startSession(1000)

    renderHook(() => useCountdown(30))

    act(() => {
      vi.advanceTimersByTime(31000)
    })

    expect(useTypingStore.getState().session.status).toBe('finished')
  })

  it('ends the session exactly at the end of the window', () => {
    vi.useFakeTimers()

    // Offset the clock from startedAt so the test fails if endedAt uses Date.now()
    vi.setSystemTime(1050)
    useTypingStore.getState().startSession(1000)

    renderHook(() => useCountdown(30))

    act(() => {
      vi.advanceTimersByTime(31000)
    })

    expect(useTypingStore.getState().session.endedAt).toBe(31000)
  })

  it('stops ticking after unmount', () => {
    vi.useFakeTimers()
    vi.setSystemTime(1000)
    useTypingStore.getState().startSession(1000)

    const { unmount } = renderHook(() => useCountdown(30))

    expect(vi.getTimerCount()).toBe(1)

    unmount()

    expect(vi.getTimerCount()).toBe(0)
  })
})
