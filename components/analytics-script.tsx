'use client'

import { useCookiePreferences } from '@/helpers/hooks/useCookies'

export function AnalyticsScript() {
  const { hasAnalytics } = useCookiePreferences()

  if (hasAnalytics()) {
    return (
      <script
        defer
        data-site-id="1"
        src="https://rybbit.rivo.gg/api/script.js"
      />
    )
  } else {
    return null
  }
}
