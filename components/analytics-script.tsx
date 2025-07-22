'use client'

import { useCookiePreferences } from '@/helpers/hooks/useCookies'
import Script from 'next/script'

export function AnalyticsScript() {
  const { hasAnalytics } = useCookiePreferences()

  if (hasAnalytics()) {
    return (
      <>
        <Script
          defer
          data-site-id="1"
          src="https://rybbit.rivo.gg/api/script.js"
          crossOrigin="anonymous"
					strategy="afterInteractive"
        />
        <Script
          src="https://cdn.databuddy.cc/databuddy.js"
          data-client-id="-uK7L4DEoLiXWIsEa0oxb"
          data-api-url="https://basket.databuddy.cc"
          data-track-web-vitals="true"
          crossOrigin="anonymous"
          strategy="afterInteractive"
          defer
        />
      </>
    )
  } else {
    return null
  }
}
