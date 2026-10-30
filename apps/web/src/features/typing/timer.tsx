import { DEFAULT_SESSION_DURATION_SECONDS } from './typing-session'
import { useCountdown } from './use-countdown'

export function Timer() {
  const secondsLeft = useCountdown(DEFAULT_SESSION_DURATION_SECONDS)

  return (
    <div className="text-center text-3xl font-semibold text-slate-900 tabular-nums">
      {secondsLeft}s
    </div>
  )
}
