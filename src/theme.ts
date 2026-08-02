export const THEME_STORAGE_KEY = 'bashilov-theme'

export const THEMES = [
  { id: 'dark-rock', label: '1 · Dark' },
  { id: 'warm-acoustic', label: '2 · Warm' },
  { id: 'clean-light', label: '3 · Clean' },
  { id: 'soft-golden', label: '4 · Soft' },
  { id: 'mist', label: '5 · Mist' },
  { id: 'sage', label: '6 · Sage' },
  { id: 'ember', label: '7 · Ember' },
  { id: 'mocha', label: '8 · Mocha' },
] as const

export type ThemeId = (typeof THEMES)[number]['id']

export const DEFAULT_THEME: ThemeId = 'warm-acoustic'

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return THEMES.some((t) => t.id === value)
}

export function getStoredTheme(): ThemeId {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (isThemeId(stored)) return stored
  } catch {
    /* ignore */
  }
  return DEFAULT_THEME
}

export function applyTheme(theme: ThemeId) {
  document.documentElement.setAttribute('data-theme', theme)
}

export function setStoredTheme(theme: ThemeId) {
  applyTheme(theme)
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    /* ignore */
  }
}
