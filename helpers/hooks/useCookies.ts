'use client'

import { useIsClient } from '@/helpers/hooks/useIsClient'
import { useState, useEffect } from 'react'
import { useMemo } from 'react'

export function useCookies() {
  const isClient = useIsClient()
  const cookies_ = isClient ? window?.document?.cookie : ''

  return useMemo(() => {
    return cookies_.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=')
      acc.set(key.trim(), value)
      return acc
    }, new Map<string, string>())
  }, [cookies_])
}

export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
}

export const useCookiePreferences = () => {
  const cookies = useCookies()
  const [data, setData] = useState<CookiePreferences>({
    necessary: true,
    analytics: true
  })
  const [showBanner, setShowBanner] = useState(true)

  useEffect(() => {
    const savedPreferences = cookies.get('cookiePreferences')
    if (savedPreferences) {
      setData(JSON.parse(savedPreferences))
      setShowBanner(false)
    }
  }, [cookies])

  const savePreferences = (preferences: typeof data) => {
    setData(preferences)
    const expires = new Date(Date.now() + 31 * 864e5).toUTCString()
    document.cookie = `cookiePreferences=${JSON.stringify(preferences)}; expires=${expires}; path=/`
  }

  const hasAnalytics = () => {
    return data.analytics
  }

  return {
    data,
    setData,
    showBanner,
    setShowBanner,
    savePreferences,
    hasAnalytics
  }
}
