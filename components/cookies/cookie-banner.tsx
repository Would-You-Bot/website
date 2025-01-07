'use client'

import { useCookieContext, CookieDialog } from '@/components/cookies'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

export function CookieBanner() {
  const { setShowBanner, state, setPreferences } = useCookieContext()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const cookieString = document.cookie
    const isCookiesSet = cookieString.includes('cookiePreferences=')
    setShowBanner(!isCookiesSet)
  }, [setShowBanner])

  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true
    }
    setPreferences(allPreferences)
    setShowBanner(false)
  }

  const handleRequiredOnly = () => {
    const requiredPreferences = {
      necessary: true,
      analytics: false
    }
    setPreferences(requiredPreferences)
    setShowBanner(false)
  }

  if (!state.preferences.necessary) return null

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 bg-hover-light shadow-md z-50">
        <div className="max-w-8xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-8">
          <div className="text-sm">
            We use cookies to enhance your browsing experience and analyze our
            traffic.
          </div>
          <div className="flex flex-wrap justify-center sm:flex-nowrap gap-4">
            <Button
              variant="ghost"
              className="h-10 hover:bg-foreground/5"
              onClick={() => setShowModal(true)}
            >
              Customize
            </Button>
            <Button
              variant="secondary"
              className="h-10 bg-foreground/10 hover:bg-foreground/5"
              onClick={handleRequiredOnly}
            >
              Required Only
            </Button>
            <Button
              className="h-10 bg-brand-blue-100 hover:bg-brand-blue-200 text-white"
              onClick={handleAcceptAll}
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>

      <CookieDialog
        open={showModal}
        preferences={state.preferences}
        onSave={setPreferences}
        onClose={() => setShowModal(false)}
      />
    </>
  )
}
