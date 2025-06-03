'use client'

import { useCookiePreferences } from '@/helpers/hooks/useCookies'

export function AnalyticsScript() {
  const { hasAnalytics } = useCookiePreferences()

  if (hasAnalytics()) {
    return (
      <>
        <script
          defer
          data-site-id="1"
          src="https://rybbit.rivo.gg/api/script.js"
        />
        <script
          src="https://app.databuddy.cc/databuddy.js"
          data-client-id="-uK7L4DEoLiXWIsEa0oxb"
          data-api-url="https://basket.databuddy.cc"
          defer
        />
      </>
    )
  } else {
    return null
  }
}
