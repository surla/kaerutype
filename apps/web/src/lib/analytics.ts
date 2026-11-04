import posthog from 'posthog-js'

export const analytics = {
  sessionStarted: () => posthog.capture('session_started'),
  sessionCompleted: () => posthog.capture('session_completed'),
  sessionRestarted: () => posthog.capture('session_restarted'),
  feedbackClicked: () => posthog.capture('feedback_clicked'),
}
