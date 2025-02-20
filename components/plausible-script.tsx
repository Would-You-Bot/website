'use client'

import { useCookiePreferences } from '@/helpers/hooks/useCookies'

export function PlausibleScript() {
  const { hasAnalytics } = useCookiePreferences()

  if (hasAnalytics()) {
    return (
      <script
        defer
        data-domain="wouldyoubot.gg"
        src="https://stats.wouldyoubot.gg/js/script.js"
      />
    )
  } else {
    return null
  }
}
