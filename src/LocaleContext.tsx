import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  type LocaleId,
  type Messages,
  getMessages,
  getStoredLocale,
  setStoredLocale,
  applyLocale,
  isLocaleId,
} from './i18n'

type LocaleContextValue = {
  locale: LocaleId
  setLocale: (id: LocaleId) => void
  t: Messages
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleId>(() => {
    if (typeof document !== 'undefined') {
      const attr = document.documentElement.getAttribute('lang')
      if (isLocaleId(attr)) return attr
    }
    return getStoredLocale()
  })

  useEffect(() => {
    setStoredLocale(locale)
    const t = getMessages(locale)
    document.title = t.meta.title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', t.meta.description)
  }, [locale])

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: (id: LocaleId) => {
        setLocaleState(id)
        applyLocale(id)
      },
      t: getMessages(locale),
    }),
    [locale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
