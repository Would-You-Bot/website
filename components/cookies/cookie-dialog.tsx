'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { CookiePreferences } from '@/helpers/hooks/useCookies'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface CookieDialogProps {
  preferences: CookiePreferences
  onSave: (preferences: CookiePreferences) => void
  onClose: () => void
  open: boolean
}

export function CookieDialog({
  preferences,
  onSave,
  onClose,
  open
}: CookieDialogProps) {
  const [localPreferences, setLocalPreferences] = useState(preferences)
  const router = useRouter()

  const handleSavePreferences = () => {
    onSave(localPreferences)
    onClose()
    router.refresh()
  }

  const handleReset = () => {
    setLocalPreferences({
      necessary: true,
      analytics: true
    })
  }

  const preferenceDescriptions: Record<keyof CookiePreferences, string> = {
    necessary: 'All the necessary cookies needed to run the website.',
    analytics: 'Optional analytics used to enhance your analytics.'
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-[425px] rounded-md">
        <DialogHeader>
          <DialogTitle>Cookie Preferences</DialogTitle>
          <DialogDescription>
            Customize your cookie preferences here. You can enable or disable
            different categories of cookies.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {Object.entries(localPreferences).map(
            ([key, value]: [string, boolean]) => (
              <div
                key={key}
                className="flex gap-2 items-center justify-between"
              >
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor={key}
                    className="capitalize"
                  >
                    {key}
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    {preferenceDescriptions[key as keyof CookiePreferences]}
                  </span>
                </div>
                <Switch
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) =>
                    setLocalPreferences((prev) => ({
                      ...prev,
                      [key]: checked
                    }))
                  }
                  disabled={key === 'necessary'}
                  className="data-[state=checked]:bg-brand-primary"
                />
              </div>
            )
          )}
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            className="order-last sm:order-first"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            variant="secondary"
            className="order-first sm:order-last"
            onClick={handleSavePreferences}
          >
            Save Preferences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
