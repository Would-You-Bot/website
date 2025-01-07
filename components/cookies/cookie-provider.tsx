'use client'

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect
} from 'react'
import { CookieDialog, CookieBanner } from '@/components/cookies'
import { CookiePreferences } from '@/helpers/hooks/useCookies'

const actionTypes = {
  SHOW_DIALOG: 'SHOW_DIALOG',
  HIDE_DIALOG: 'HIDE_DIALOG',
  SET_PREFERENCES: 'SET_PREFERENCES',
  REVOKE_PERMISSIONS: 'REVOKE_PERMISSIONS',
  SET_SHOW_BANNER: 'SET_SHOW_BANNER'
} as const

interface CookieState {
  showDialog: boolean
  showBanner: boolean
  preferences: CookiePreferences
}

const initialState: CookieState = {
  showDialog: false,
  showBanner: false,
  preferences: {
    necessary: true,
    analytics: true
  }
}

function cookieReducer(state: CookieState, action: any): CookieState {
  switch (action.type) {
    case actionTypes.SHOW_DIALOG:
      return { ...state, showDialog: true }
    case actionTypes.HIDE_DIALOG:
      return { ...state, showDialog: false }
    case actionTypes.SET_PREFERENCES:
      return { ...state, preferences: action.payload, showBanner: false }
    case actionTypes.REVOKE_PERMISSIONS:
      return { ...state, preferences: initialState.preferences }
    case actionTypes.SET_SHOW_BANNER:
      return { ...state, showBanner: action.payload }
    default:
      return state
  }
}

const CookieContext = createContext<{
  state: CookieState
  showCookieDialog: () => void
  hideCookieDialog: () => void
  setPreferences: (preferences: CookiePreferences) => void
  setShowBanner: (show: boolean) => void
}>({
  state: initialState,
  showCookieDialog: () => {},
  hideCookieDialog: () => {},
  setPreferences: () => {},
  setShowBanner: () => {}
})

export const CookieProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [state, dispatch] = useReducer(cookieReducer, initialState)

  const showCookieDialog = useCallback(
    () => dispatch({ type: actionTypes.SHOW_DIALOG }),
    []
  )
  const hideCookieDialog = useCallback(
    () => dispatch({ type: actionTypes.HIDE_DIALOG }),
    []
  )

  const setPreferences = useCallback((preferences: CookiePreferences) => {
    dispatch({ type: actionTypes.SET_PREFERENCES, payload: preferences })
    document.cookie = `cookiePreferences=${JSON.stringify(preferences)}; path=/`
  }, [])

  const setShowBanner = useCallback((show: boolean) => {
    dispatch({ type: actionTypes.SET_SHOW_BANNER, payload: show })
  }, [])

  useEffect(() => {
    const cookieString = document.cookie
    const cookiePreferencesMatch = cookieString.match(
      /cookiePreferences=([^;]+)/
    )

    if (cookiePreferencesMatch) {
      const cookiePreferences = JSON.parse(cookiePreferencesMatch[1])
      dispatch({
        type: actionTypes.SET_PREFERENCES,
        payload: cookiePreferences
      })
    } else {
      setShowBanner(true)
    }
  }, [setShowBanner])

  return (
    <CookieContext.Provider
      value={{
        state,
        showCookieDialog,
        hideCookieDialog,
        setPreferences,
        setShowBanner
      }}
    >
      {children}
      {state.showBanner && <CookieBanner />}
      {state.showDialog && (
        <CookieDialog
          preferences={state.preferences}
          onSave={setPreferences}
          onClose={hideCookieDialog}
          open={state.showDialog}
        />
      )}
    </CookieContext.Provider>
  )
}

export const useCookieContext = () => useContext(CookieContext)
